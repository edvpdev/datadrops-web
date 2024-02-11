import { Textarea } from 'flowbite-react';
import { debounce } from 'lodash';
import { useState } from 'react';
import JsonNataEditorModal from './JsonNataEditorModal';
import { cn } from '@/lib/utils';
import { useGetJnataQueriesQuery } from 'redux/apis/jnataQueriesApi';
import { JNataQueriesDropdown } from '../../jsonata-queries';

interface IJsonNataEditorProps {
  setJsonNataQuery: (result: null | any) => void;
}

export default function JsonNataEditor({
  setJsonNataQuery
}: IJsonNataEditorProps) {
  const { data: queries } = useGetJnataQueriesQuery(null);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  // in order to pass to modal
  const [localJsonNataQuery, setLocalJsonNataQuery] = useState<string>('');

  const setJsonataQueryHandler = (query: string) => {
    setLocalJsonNataQuery(query);
    setJsonNataQuery(query);
  };

  const jsonataHandler = debounce(
    async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJsonataQueryHandler(e.target.value);
    },
    1000
  );

  const openSaveModalHandler = () => {
    setSaveModalOpen(true);
  };

  const closeSaveModalHandler = () => {
    setSaveModalOpen(false);
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <JsonNataEditorModal
          isOpen={isSaveModalOpen}
          closeModalFn={closeSaveModalHandler}
          jsonNataQuery={localJsonNataQuery}
        />
        <div>
          <div>JSONata query</div>
          <div className="text-xs text-gray-400">
            <a href="https://docs.jsonata.org/overview.html" target="_blank">
              https://docs.jsonata.org/overview.html
            </a>
          </div>
        </div>
        <JNataQueriesDropdown
          queries={queries || []}
          setJsonataQueryHandler={setJsonataQueryHandler}
        />
      </div>
      <Textarea
        className="mb-2 flex-grow resize-none"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setLocalJsonNataQuery(e.target.value);
          jsonataHandler(e);
        }}
        spellCheck={false}
        value={localJsonNataQuery}
      />
      <div className="flex flex-shrink justify-end">
        <button
          className={cn(
            'btn btn-primary btn-sm',
            !localJsonNataQuery && 'btn-disabled'
          )}
          onClick={() => openSaveModalHandler()}>
          Save
        </button>
      </div>
    </>
  );
}
