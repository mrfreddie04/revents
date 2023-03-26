import React from "react";
import { FormField, Label, Segment, List } from 'semantic-ui-react';
import { useField } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


export default function PlaceInput({label, options, ...props}) {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && !!meta.error;

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => helpers.setValue({address, latlng}))
      .catch(error => helpers.setError(error));
  };

  const handleChange = address => {
    helpers.setValue({address});
  };  

  const handleBlur = (e) => {
    field.onBlur(e);
    if(!field.value.latlng) {
      helpers.setValue({address:'', latlng: null}); //will trigger error
    }
    //helpers.setTouched(true); //taken care by field.onBlur(e);
  };

  return (
    <PlacesAutocomplete
      value={field.value['address']}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={isError}>
          <input 
            {...getInputProps({
              name: field.name,
              onBlur: handleBlur,
              ...props    
            })}
          />
          {isError && <Label basic color='red' content={meta.error['address']}/>}
          {suggestions && suggestions.length > 0 && (
            <Segment loading={loading} style={{ marginTop: 0, position: 'absolute', zIndex: 10, width:'100%'}}>
              <List selection>
                {
                  suggestions.map(suggestion => (
                    <List.Item key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                      <List.Header>{suggestion.formattedSuggestion.mainText}</List.Header>
                      <List.Description>{suggestion.formattedSuggestion.secondaryText}</List.Description>
                    </List.Item>                  
                  ))
                }  
              </List>
            </Segment>  
          )}
        </FormField>        
      )}
    </PlacesAutocomplete>    
  );
}  
