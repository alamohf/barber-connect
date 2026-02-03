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
            // 1. Upload image to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/${styleId}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload (upsert to overwrite if exists)
            const { error: uploadError } = await supabase.storage
                .from('style-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('style-images')
                .getPublicUrl(filePath);

            // 3. Save/Update record in Database
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
                    { onConflict: 'user_id, style_id' }
                );

            if (dbError) throw dbError;

            return publicUrl;
        } catch (error) {
            console.error('Error updating user style:', error);
            return null;
        }
    }
};
