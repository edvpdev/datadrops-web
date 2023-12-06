export default function StatusIndicator({ status }: { status: string }) {
  switch (status) {
    case 'started':
      return (
        <div className="tooltip" data-tip="Running...">
          <div className="h-4 w-4 rounded-full bg-secondary"></div>
        </div>
      );
    case 'finished':
      return (
        <div className="tooltip" data-tip="Finished">
          <div className="h-4 w-4 rounded-full bg-success"></div>
        </div>
      );
    case 'failed':
      return (
        <div className="tooltip" data-tip="Failed">
          <div className="h-4 w-4 rounded-full bg-error"></div>
        </div>
      );
    default:
      return null;
  }
}
