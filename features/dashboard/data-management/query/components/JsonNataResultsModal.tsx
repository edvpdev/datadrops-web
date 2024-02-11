import { Modal, TextInput, Textarea } from 'flowbite-react';
import { useCallback, useContext, useState } from 'react';
import { QueryWrapperContext } from '..';
import { debounce } from 'lodash';
import { useCreateViewMutation } from 'redux/apis/viewsApi';
import toast from 'react-hot-toast';
import { Toasty } from '@/lib/components';

interface JsonNataResultsModalProps {
  isOpen: boolean;
  closeModalFn: () => void;
  jsonNataQuery: string | null;
}

export default function JsonNataResultsModal({
  isOpen,
  closeModalFn,
  jsonNataQuery
}: JsonNataResultsModalProps) {
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const template = queryWrapperCtx.pages[0].selectedTemplate;

  const [createView, { isLoading, error }] = useCreateViewMutation();

  const [viewTitle, setViewTitle] = useState('');
  const [viewDescription, setDescription] = useState('');

  const saveHandler = useCallback(async () => {
    if (!template || !jsonNataQuery || !viewTitle || !viewDescription) return;
    await createView({
      templateKey: template.templateKey,
      jsonNataQuery: jsonNataQuery,
      title: viewTitle,
      description: viewDescription,
      providerId: template.providerId,
      entityLabel: template.entryCollection
    })
      .then(() => {
        toast.custom((t) => (
          <Toasty
            t={t}
            type="success"
            message="Custom view created successfully"
          />
        ));
      })
      .catch((e) => {
        toast.custom((t) => (
          <Toasty t={t} type="error" message="Creating view was unsuccessful" />
        ));
      });
  }, [template, jsonNataQuery, viewTitle, viewDescription, createView]);

  const titleHandler = debounce(function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setViewTitle(e.target.value);
  }, 500);

  const descriptionHandler = debounce(function (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(e.target.value);
  }, 500);

  return (
    <>
      <Modal show={isOpen} onClose={closeModalFn}>
        <Modal.Header>Save as View</Modal.Header>
        <Modal.Body>
          <div className="mb-2 font-bold">Name (*)</div>
          <TextInput
            className="mb-4 w-full"
            maxLength={20}
            onChange={(e) => titleHandler(e)}
          />
          <div className="mb-2 font-bold">Description (*)</div>
          <Textarea
            className="mb-4 w-full"
            maxLength={100}
            onChange={(e) => descriptionHandler(e)}
          />
          <div className="mb-2">
            <p>
              <strong>Template ID:</strong> {template?.templateKey || ''}
            </p>
            <p>
              <strong>JSONata query:</strong> {jsonNataQuery || ''}
            </p>
            <p>
              <strong>Provider:</strong> {template?.providerId || ''}
            </p>
            <p>
              <strong>Entity Label:</strong> {template?.entryCollection || ''}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full flex-row justify-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => saveHandler()}>
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
