import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Image, X, RotateCcw } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';

interface StyleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleName: string;
  styleIcon: string;
  currentImage?: string;
  onSave: (name: string, file?: File) => void;
  onReset: () => void;
}

export function StyleEditModal({
  isOpen,
  onClose,
  styleName,
  styleIcon,
  currentImage,
  onSave,
  onReset,
}: StyleEditModalProps) {
  const [name, setName] = useState(styleName);
  const [imageData, setImageData] = useState<string | undefined>(currentImage);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state with props when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setName(styleName);
      setImageData(currentImage);
      setSelectedFile(undefined);
    }
  }, [isOpen, styleName, currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Comprimir e converter para base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedData = canvas.toDataURL('image/jpeg', 0.7);
          setImageData(compressedData);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(name, selectedFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  const handleReset = () => {
    onReset();
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  const handleRemoveImage = () => {
    setImageData(undefined);
    setSelectedFile(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Estilo</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preview da imagem */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-muted border-2 border-border flex items-center justify-center">
              {imageData ? (
                <>
                  <img
                    src={imageData}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full"
                    aria-label="Remover imagem"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <DynamicIcon name={styleIcon} className="h-16 w-16 text-muted-foreground" />
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Image className="h-4 w-4" />
                Galeria
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.capture = 'environment';
                    fileInputRef.current.click();
                  }
                }}
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                Câmera
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Campo de nome */}
          <div className="space-y-2">
            <Label htmlFor="style-name" className="text-base">
              Nome do estilo
            </Label>
            <Input
              id="style-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do estilo"
              className="h-12 text-lg"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Restaurar padrão
          </Button>
          <Button onClick={handleSave} className="h-12 px-8">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
