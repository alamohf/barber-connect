import { supabase } from '@/lib/supabase';

export type styleType = 'hair' | 'beard' | 'haircut-method' | 'machine-height' | 'fade-type' | 'side-style' | 'finish-style' | 'scissor-height' | 'beard-height' | 'beard-contour';

export interface UserStyleConfig {
    style_id: string;
    type: styleType;
    custom_image_url: string;
}


export const styleService = {
    // Fetch all custom style configurations for a user
    async getUserStyles(userId: string): Promise<UserStyleConfig[]> {
        const { data, error } = await supabase
            .from('user_style_configs')
            .select('style_id, type, custom_image_url, updated_at')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user styles:', error);
            return [];
        }

        return (data || []).map(config => ({
            ...config,
            custom_image_url: config.updated_at
                ? `${config.custom_image_url}?t=${new Date(config.updated_at).getTime()}`
                : config.custom_image_url
        }));
    },

    // Update or Insert a custom style configuration
    async updateUserStyle(
        userId: string,
        styleId: string,
        type: styleType,
        file: File
    ): Promise<string | null> {

        try {
            console.log(`[StyleService] Starting update for ${type}:${styleId}`);

            // 1. Cleanup old images for this style
            console.log(`[StyleService] Cleaning up old images in bucket style-images for folder: ${userId}`);
            const { data: files } = await supabase.storage
                .from('style-images')
                .list(userId);

            if (files) {
                const prefix = `${type}_${styleId}_`;
                // Also match the old format without timestamp
                const filesToDelete = files
                    .filter(f => f.name.startsWith(prefix) || f.name.startsWith(`${type}_${styleId}.`))
                    .map(f => `${userId}/${f.name}`);

                if (filesToDelete.length > 0) {
                    console.log('[StyleService] Deleting old files:', filesToDelete);
                    await supabase.storage.from('style-images').remove(filesToDelete);
                }
            }

            // 2. Upload image to Storage with unique name
            const fileExt = file.name.split('.').pop();
            const timestamp = Date.now();
            const fileName = `${userId}/${type}_${styleId}_${timestamp}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log(`[StyleService] Uploading to Storage: ${filePath}`);
            const { error: uploadError } = await supabase.storage
                .from('style-images')
                .upload(filePath, file, {
                    cacheControl: '0',
                    upsert: false // We use unique names anyway
                });

            if (uploadError) {
                console.error('[StyleService] Storage Upload Error:', uploadError);
                throw uploadError;
            }

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('style-images')
                .getPublicUrl(filePath);

            console.log('[StyleService] Public URL:', publicUrl);

            // 4. Save/Update record in Database
            console.log('[StyleService] Upserting to Database...');
            const { error: dbError } = await supabase
                .from('user_style_configs')
                .upsert(
                    {
                        user_id: userId,
                        style_id: styleId,
                        type: type,
                        custom_image_url: publicUrl,
                        updated_at: new Date().toISOString(),
                    },
                    { onConflict: 'user_id, style_id, type' }
                );

            if (dbError) {
                console.error('[StyleService] Database Upsert Error:', dbError);
                throw dbError;
            }
            console.log('[StyleService] Database Upsert Success');

            // Return URL with timestamp as extra precaution
            return `${publicUrl}?t=${Date.now()}`;
        } catch (error) {
            console.error('[StyleService] Final catch error:', error);
            return null;
        }
    },

    // Delete a custom style configuration
    async deleteUserStyle(
        userId: string,
        styleId: string,
        type: styleType
    ): Promise<boolean> {
        try {
            console.log(`[StyleService] Resetting style for ${type}:${styleId}`);

            // 1. Remove from Database
            const { error: dbError } = await supabase
                .from('user_style_configs')
                .delete()
                .match({ user_id: userId, style_id: styleId, type: type });

            if (dbError) {
                console.error('[StyleService] Database Delete Error:', dbError);
                throw dbError;
            }

            // 2. Remove files from Storage
            const { data: files } = await supabase.storage
                .from('style-images')
                .list(userId);

            if (files) {
                const prefix = `${type}_${styleId}_`;
                const filesToDelete = files
                    .filter(f => f.name.startsWith(prefix) || f.name.startsWith(`${type}_${styleId}.`))
                    .map(f => `${userId}/${f.name}`);

                if (filesToDelete.length > 0) {
                    console.log('[StyleService] Cleaning up Storage on reset:', filesToDelete);
                    await supabase.storage.from('style-images').remove(filesToDelete);
                }
            }

            console.log('[StyleService] style reset successfully');
            return true;
        } catch (error) {
            console.error('[StyleService] Reset catch error:', error);
            return false;
        }
    }
};
