import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Loader } from 'semantic-ui-react';
import { toast } from "react-toastify";
import { addEventChatComment } from '../../../app/firestore/firebase-realtime-service';
//import TextArea from '../../../app/common/form/text-area';

const initialValues = {
  comment:''
};

export default function EventDetailedChatForm({eventId, parentId, onCommentSubmit}) {

  const handleFormSubmit = async (values, {setSubmitting, resetForm}) => {
    try {
      await addEventChatComment(eventId, parentId, values.comment);
      resetForm();
    } catch(err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
      if(onCommentSubmit) onCommentSubmit();
    }
  }

  const validationSchema = Yup.object({
    comment: Yup.string().required('You must provide a comment'),
  });    

  return (
    <Formik
      initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    > 
    {({dirty, isSubmitting, isValid, handleSubmit }) => (
      <Form className="ui form replay">    
        <Field 
          name="comment"           
        >
          {({field}) => (
            <div style={{position: 'relative'}}>
              <Loader active={isSubmitting}/>
              <textarea 
                {...field}
                placeholder="Please enter your comment (ENTER to submit, SHIFT+ENTER for new line)" 
                rows={2}
                onKeyDown={ (e) => {
                  if(e.key === 'Enter' && e.shiftKey) { return; }
                  if(e.key === 'Enter' && !e.shiftKey ) { 
                    e.preventDefault();
                    if(dirty && isValid) {
                      handleSubmit(); 
                    }
                  }
                }}
              ></textarea>
            </div>
          )}
        </Field>
      </Form>
      )}
    </Formik>    
  )
}

// <TextArea 
// placeholder="Please enter your comment here" 
// name="comment" 
// rows={2}
// />

// <Button
// type="submit"
// loading={isSubmitting}
// disabled={!dirty || !isValid || isSubmitting}
// content="Add reply"
// icon="edit"
// primary
// />