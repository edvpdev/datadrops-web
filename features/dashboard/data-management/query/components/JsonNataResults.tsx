import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import JsonNataResultsModal from './JsonNataResultsModal';
import { useContext, useEffect, useState } from 'react';
import jsonata from 'jsonata';
import { QueryWrapperContext } from '..';

interface JsonNataResultsProps {
  jsonNataQuery: string | null;
}

export default function JsonNataResults({
  jsonNataQuery
}: JsonNataResultsProps) {
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [newResults, setNewResults] = useState<any>(null);
  const queryWrapperCtx = useContext(QueryWrapperContext);
  const results = queryWrapperCtx?.pages[0].results;

  const openSaveModalHandler = () => {
    setSaveModalOpen(true);
  };

  const closeSaveModalHandler = () => {
    setSaveModalOpen(false);
  };

  useEffect(() => {
    async function evaluate() {
      if (!jsonNataQuery) return;

      if (jsonNataQuery === '') {
        setNewResults(null);
        return;
      }

      try {
        const expression = jsonata(jsonNataQuery);
        const result = await expression.evaluate(results.results);
        setNewResults(result);
      } catch (e: any) {
        setNewResults(`Error: ${e.message}`);
      }
    }

    evaluate();
  }, [jsonNataQuery, results]);

  if (newResults === null) return null;

  return (
    <div className="flex h-full flex-col">
      <JsonNataResultsModal
        isOpen={isSaveModalOpen}
        closeModalFn={closeSaveModalHandler}
        jsonNataQuery={jsonNataQuery}
      />
      <div className="mb-2 flex-shrink">JSONata results</div>
      <div className="grow overflow-y-scroll">
        <JsonView
          data={newResults}
          shouldExpandNode={allExpanded}
          style={defaultStyles}
        />
      </div>

      <div className="mt-2 flex flex-shrink justify-end">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => openSaveModalHandler()}>
          Save
        </button>
      </div>
    </div>
  );
}
