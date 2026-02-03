import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { OptionSection } from '@/components/OptionSection';
import { OptionButton } from '@/components/OptionButton';
import { Button } from '@/components/ui/button';
import { useSelection } from '@/contexts/SelectionContext';
import { useCustomStyles } from '@/contexts/CustomStylesContext';
import { ArrowRight } from 'lucide-react';
import { StyleEditModal } from '@/components/StyleEditModal';
import { styleType } from '@/services/styleService';

const BeardDetails = () => {
  const navigate = useNavigate();
  const { selection, setBeardDetails } = useSelection();
  const { beardDetails } = selection;
  const {
    beardHeights,
    beardContours,
    updateStyleImage
  } = useCustomStyles();

  const [editingOption, setEditingOption] = useState<{
    id: string;
    name: string;
    icon: string;
    image: string;
    type: styleType;
  } | null>(null);

  const handleEditSave = async (name: string, file?: File) => {
    if (editingOption && file) {
      await updateStyleImage(editingOption.id, editingOption.type, file);
    }
    setEditingOption(null);
  };

  const handleEditReset = () => {
    setEditingOption(null);
  };

  const handleNext = () => {
    navigate('/confirmation');
  };

  const getProgress = () => {
    if (selection.serviceType === 'both') {
      return { current: 4, total: 5 };
    }
    return { current: 2, total: 3 };
  };

  const isComplete = beardDetails.height && beardDetails.contour;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader
        title="Detalhes da Barba"
        backTo="/beard"
        progress={getProgress()}
      />

      <main className="flex-1 container max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Altura da Barba */}
        <OptionSection title="Altura da Barba">
          {beardHeights.map(height => (
            <OptionButton
              key={height.id}
              icon={height.icon}
              label={height.label}
              defaultImage={height.defaultImage}
              imageData={height.imageData}
              selected={beardDetails.height === height.id}
              onClick={() => setBeardDetails({
                height: beardDetails.height === height.id ? null : height.id
              })}
              onEdit={() => setEditingOption({
                id: height.id,
                name: height.label,
                icon: height.icon,
                image: height.imageData || height.defaultImage,
                type: 'beard-height'
              })}
              editable
            />
          ))}
        </OptionSection>

        {/* Contorno */}
        <OptionSection title="Contorno">
          {beardContours.map(contour => (
            <OptionButton
              key={contour.id}
              icon={contour.icon}
              label={contour.label}
              defaultImage={contour.defaultImage}
              imageData={contour.imageData}
              selected={beardDetails.contour === contour.id}
              onClick={() => setBeardDetails({
                contour: beardDetails.contour === contour.id ? null : contour.id
              })}
              onEdit={() => setEditingOption({
                id: contour.id,
                name: contour.label,
                icon: contour.icon,
                image: contour.imageData || contour.defaultImage,
                type: 'beard-contour'
              })}
              editable
            />
          ))}
        </OptionSection>
      </main>

      {/* Botão Continuar */}
      <div className="sticky bottom-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border safe-bottom">
        <div className="container max-w-2xl mx-auto">
          <Button
            onClick={handleNext}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {editingOption && (
        <StyleEditModal
          isOpen={!!editingOption}
          onClose={() => setEditingOption(null)}
          styleName={editingOption.name}
          styleIcon={editingOption.icon}
          currentImage={editingOption.image}
          onSave={handleEditSave}
          onReset={handleEditReset}
        />
      )}
    </div>
  );
};


export default BeardDetails;