import { Modal, Textarea } from 'flowbite-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Toasty } from '@/lib/components';
import { useGetJnataQueriesQuery } from 'redux/apis/jnataQueriesApi';
import { useUpdateViewMutation } from 'redux/apis/viewsApi';
import { JNataQueriesDropdown } from '../../jsonata-queries';

interface ViewUpdateModalProps {
  isOpen: boolean;
  closeModalFn: () => void;
  jsonNataQuery: string;
  description: string;
  viewId: string;
}

export default function ViewUpdateModal({
  isOpen,
  closeModalFn,
  jsonNataQuery,
  description,
  viewId
}: ViewUpdateModalProps) {
  const { data: queries } = useGetJnataQueriesQuery(null);
  const [updateView, { isLoading, error }] = useUpdateViewMutation();

  const [localJsonNataQuery, setLocalJsonNataQuery] = useState<string>('');
  const [viewQuery, setViewQuery] = useState(jsonNataQuery);
  const [viewDescription, setDescription] = useState(description);

  const saveHandler = useCallback(async () => {
    if (!viewDescription || !viewQuery) return;
    await updateView({
      body: {
        jsonNataQuery: viewQuery,
        description: viewDescription
      },
      viewId
    })
      .unwrap()
      .then(() => {
        toast.custom((t) => (
          <Toasty
            t={t}
            type="success"
            message="View was updated successfully"
          />
        ));
      })
      .catch((e) => {
        toast.custom((t) => (
          <Toasty t={t} type="error" message="View update was unsuccessful" />
        ));
      });
  }, [viewDescription, viewQuery, updateView, viewId]);

  const queryHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setViewQuery(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <Modal show={isOpen} onClose={closeModalFn}>
        <Modal.Header>Update View</Modal.Header>
        <Modal.Body>
          <div className="item-center mb-2 flex justify-between">
            <div className="font-bold">JsonNata query (*)</div>
            <JNataQueriesDropdown
              queries={queries || []}
              setJsonataQueryHandler={setViewQuery}
            />
          </div>

          <Textarea
            className="mb-4 w-full"
            maxLength={100}
            onChange={(e) => queryHandler(e)}
            value={viewQuery}
          />
          <div className="mb-2 font-bold">Description (*)</div>
          <Textarea
            className="mb-4 w-full"
            maxLength={100}
            onChange={(e) => descriptionHandler(e)}
            value={viewDescription}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full flex-row justify-end">
            <button
              className="btn btn-success btn-sm"
              onClick={() => saveHandler()}>
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
