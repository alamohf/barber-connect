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
            .select('style_id, type, custom_image_url')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user styles:', error);
            return [];
        }

        return data || [];
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

            // 1. Upload image to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/${type}_${styleId}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log(`[StyleService] Uploading to Storage: ${filePath}`);
            // Upload (upsert to overwrite if exists)
            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('style-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                console.error('[StyleService] Storage Upload Error:', uploadError);
                throw uploadError;
            }
            console.log('[StyleService] Storage Upload Success:', uploadData);

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('style-images')
                .getPublicUrl(filePath);

            console.log('[StyleService] Public URL:', publicUrl);

            // 3. Save/Update record in Database
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

            return publicUrl;
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

            // 2. Note: We could delete from Storage, but overwriting on upload 
            // is usually enough and safer (prevents broken links if shared).
            // For now, removing the DB record is what triggers the default icon.

            console.log('[StyleService] style reset successfully');
            return true;
        } catch (error) {
            console.error('[StyleService] Reset catch error:', error);
            return false;
        }
    }
};
