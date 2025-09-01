import React, { useState } from 'react';
import {
  TextInput,
  NumberInput,
  SelectInput,
  MultiSelectList,
  ColorInput,
  DynamicList,
  UrlInput
} from './FormComponents';

const DesignForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'displayAds',
    subtype: 'displayAds-half-page-ad',
    dimension: {
      width: 300,
      height: 600
    },
    prompt: '',
    assets: {
      images: [],
      logos: []
    },
    colors: ['#5662EC'],
    fonts: [],
    language: 'english',
    numOfVariants: 4,
    outputFormat: ['jpg']
  });

  const updateField = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '#000000']
    }));
  };

  const updateColor = (index, color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((c, i) => i === index ? color : c)
    }));
  };

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const renderImageItem = (image, onChange) => (
    <div className="asset-item">
      <UrlInput
        label="Image URL"
        value={image.url || ''}
        onChange={(url) => onChange({ ...image, url })}
        placeholder="https://example.com/image.jpg"
      />
      <div className="image-preferences">
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={image.imagePreference?.crop || false}
            onChange={(e) => onChange({
              ...image,
              imagePreference: {
                ...image.imagePreference,
                crop: e.target.checked
              }
            })}
          />
          <label>Crop</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={image.imagePreference?.removeBg || false}
            onChange={(e) => onChange({
              ...image,
              imagePreference: {
                ...image.imagePreference,
                removeBg: e.target.checked
              }
            })}
          />
          <label>Remove Background</label>
        </div>
      </div>
    </div>
  );

  const renderLogoItem = (logo, onChange) => (
    <div className="asset-item">
      <UrlInput
        label="Logo URL"
        value={logo.url || ''}
        onChange={(url) => onChange({ ...logo, url })}
        placeholder="https://example.com/logo.png"
      />
      <MultiSelectList
        label="Logo Styles"
        values={logo.logoStyles || []}
        onChange={(styles) => onChange({ ...logo, logoStyles: styles })}
        options={[
          { value: 'direct', label: 'Direct' },
          { value: 'outline', label: 'Outline' },
          { value: 'shadow', label: 'Shadow' },
          { value: 'embossed', label: 'Embossed' }
        ]}
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="design-form">
      <SelectInput
        label="Type"
        value={formData.type}
        onChange={(value) => updateField('type', value)}
        options={[
          { value: 'displayAds', label: 'Display Ads' },
          { value: 'socialMedia', label: 'Social Media' },
          { value: 'print', label: 'Print' }
        ]}
      />

      <SelectInput
        label="Subtype"
        value={formData.subtype}
        onChange={(value) => updateField('subtype', value)}
        options={[
          { value: 'displayAds-half-page-ad', label: 'Half Page Ad' },
          { value: 'displayAds-banner', label: 'Banner' },
          { value: 'displayAds-square', label: 'Square' }
        ]}
      />

      <div className="dimension-group">
        <NumberInput
          label="Width"
          value={formData.dimension.width}
          onChange={(value) => updateField('dimension.width', value)}
          min={1}
        />
        <NumberInput
          label="Height"
          value={formData.dimension.height}
          onChange={(value) => updateField('dimension.height', value)}
          min={1}
        />
      </div>

      <TextInput
        label="Prompt"
        value={formData.prompt}
        onChange={(value) => updateField('prompt', value)}
        placeholder="Describe your design requirements..."
      />

      <DynamicList
        label="Images"
        items={formData.assets.images}
        onChange={(images) => updateField('assets.images', images)}
        renderItem={renderImageItem}
        addButtonText="Add Image"
      />

      <DynamicList
        label="Logos"
        items={formData.assets.logos}
        onChange={(logos) => updateField('assets.logos', logos)}
        renderItem={renderLogoItem}
        addButtonText="Add Logo"
      />

      <div className="colors-section">
        <label className="form-label">Colors</label>
        <div className="colors-list">
          {formData.colors.map((color, index) => (
            <div key={index} className="color-item">
              <ColorInput
                value={color}
                onChange={(newColor) => updateColor(index, newColor)}
              />
              {formData.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="remove-color-button"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addColor} className="add-color-button">
          Add Color
        </button>
      </div>

      <SelectInput
        label="Language"
        value={formData.language}
        onChange={(value) => updateField('language', value)}
        options={[
          { value: 'english', label: 'English' },
          { value: 'spanish', label: 'Spanish' },
          { value: 'french', label: 'French' },
          { value: 'german', label: 'German' }
        ]}
      />

      <NumberInput
        label="Number of Variants"
        value={formData.numOfVariants}
        onChange={(value) => updateField('numOfVariants', value)}
        min={1}
        max={10}
      />

      <MultiSelectList
        label="Output Format"
        values={formData.outputFormat}
        onChange={(formats) => updateField('outputFormat', formats)}
        options={[
          { value: 'jpg', label: 'JPG' },
          { value: 'png', label: 'PNG' },
          { value: 'pdf', label: 'PDF' },
          { value: 'svg', label: 'SVG' }
        ]}
      />

      <button type="submit" className="ai-studio-button">
        Generate Design
      </button>
    </form>
  );
};

export default DesignForm;
