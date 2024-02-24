import { Modal, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import { CanUserUse, Toasty } from '@/lib/components';
import { useCreateJnataQueryMutation } from 'redux/apis/jnataQueriesApi';
import { cn } from '@/lib/utils';

interface JsonNataResultsModalProps {
  isOpen: boolean;
  closeModalFn: () => void;
  jsonNataQuery: string | null;
}

export default function JsonNataEditorModal({
  isOpen,
  closeModalFn,
  jsonNataQuery
}: JsonNataResultsModalProps) {
  const [createJnataQuery, { isLoading, error }] =
    useCreateJnataQueryMutation();

  const [queryTitle, setQueryTitle] = useState('');

  const saveHandler = useCallback(async () => {
    if (!jsonNataQuery || !queryTitle) return;
    await createJnataQuery({
      jsonNataQuery: jsonNataQuery,
      title: queryTitle
    })
      .then(() => {
        toast.custom((t) => (
          <Toasty
            t={t}
            type="success"
            message="JsonNata query was saved successfully"
          />
        ));
      })
      .catch((e) => {
        toast.custom((t) => (
          <Toasty t={t} type="error" message="Saving query was unsuccessful" />
        ));
      });
  }, [jsonNataQuery, queryTitle, createJnataQuery]);

  const titleHandler = debounce(function (
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setQueryTitle(e.target.value);
  }, 500);

  return (
    <>
      <Modal show={isOpen} onClose={closeModalFn}>
        <Modal.Header>Save Query</Modal.Header>
        <Modal.Body>
          <div className="mb-2 font-bold">Name (*)</div>
          <TextInput
            className="mb-4 w-full"
            maxLength={20}
            onChange={(e) => titleHandler(e)}
          />
          <div className="mb-2">
            <p>
              <strong>JSONata query:</strong> {jsonNataQuery || ''}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full flex-row justify-end">
            <CanUserUse roles={['pro', 'standard']}>
              {(canUse) => (
                <button
                  className={cn(
                    'btn btn-primary btn-sm',
                    !canUse && 'btn-disabled'
                  )}
                  onClick={() => saveHandler()}>
                  Save
                </button>
              )}
            </CanUserUse>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
