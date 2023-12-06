// 'use client';

// import {
//   IProviderEntityDepSettings,
//   DependencySettingWithHelpButton,
//   IProviderEntity,
//   ISynchronization,
//   IProviderEntityDependency
// } from '@/lib/types';
// import { isoToDateString } from '@/lib/utils/index';
// import { cn } from '@/lib/utils';
// import { Badge, Modal, Label } from 'flowbite-react';
// import React, {
//   memo,
//   useCallback,
//   useState,
//   useMemo,
//   useEffect,
//   createRef
// } from 'react';
// import { useSelector } from 'react-redux';
// import { useRunSynchronizationMutation } from 'redux/apis/synchronizationsApi';
// import { RootState } from 'redux/store';
// import { SyncsSettingsForm, TextField } from 'features/form';
// import toast from 'react-hot-toast';
// import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
// import 'react-json-view-lite/dist/index.css';
// import { isEqual } from 'lodash';
// import { useGetEntitiesQueryWithType } from 'redux/apis/entitiesApi';
// import { FormErrors } from 'features/form/SyncsSettingsForm';
// import { Toasty } from '@/lib/components';

// const SyncButton = memo(function SyncButton({
//   lastStatus,
//   onClick,
//   disabled,
//   isLoading
// }: {
//   lastStatus: string;
//   onClick: () => void;
//   disabled: boolean;
//   isLoading: boolean;
// }) {
//   console.log('rerender');
//   const onClickHandler = useCallback(() => {
//     if (lastStatus === 'started' || isLoading) return;
//     onClick();
//   }, [lastStatus, onClick, isLoading]);
//   return (
//     <button
//       className={cn(
//         'btn btn-sm bg-success',
//         (lastStatus === 'started' || disabled || isLoading) && 'btn-disabled'
//       )}
//       onClick={() => onClickHandler()}>
//       {(lastStatus === 'started' || isLoading) && (
//         <span className="loading loading-spinner loading-xs"></span>
//       )}
//       {lastStatus === 'started' || isLoading
//         ? 'Synchronizing'
//         : !lastStatus
//         ? 'Sync'
//         : 'Resync'}
//     </button>
//   );
// });

// interface SyncOverviewDetailsProps {
//   entity: IProviderEntity | undefined;
// }

// const SyncOverviewDetails = memo(function SyncOverviewDetails({
//   entity
// }: SyncOverviewDetailsProps) {
//   console.log('rerender');
//   if (!entity)
//     return (
//       <div className="max-w grid gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//         <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
//           Details
//         </h5>
//         No Entity
//       </div>
//     );

//   return (
//     <div className="max-w grid gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//       <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
//         Details
//       </h5>
//       <div className="text-base font-normal text-gray-700 dark:text-gray-400">
//         <div
//           className="content"
//           dangerouslySetInnerHTML={{ __html: entity.description }}></div>
//       </div>
//       {!!entity.dependsOn.length && (
//         <>
//           <h6 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
//             Depends on:
//           </h6>
//           <div className="mb-2 flex flex-wrap gap-2">
//             {entity.dependsOn.map((dependency) => (
//               <Badge key={dependency.entity} color="gray">
//                 {dependency.title}
//               </Badge>
//             ))}
//           </div>
//         </>
//       )}
//       {/* TODO DOCS PAGE */}
//       {/* <button className="btn btn-info btn-sm w-auto justify-self-end text-white">
//           Read more <HiOutlineArrowRight className="ml-2" />
//         </button> */}
//     </div>
//   );
// }, isEqual);

// interface OverviewLastSyncProps {
//   sync: ISynchronization | undefined;
// }

// const SyncOverviewLastStatus = memo(function SyncOverviewLastStatus({
//   sync
// }: OverviewLastSyncProps) {
//   console.log('rerender');
//   if (!sync) {
//     return (
//       <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//         <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
//           Last synchronization
//         </h5>
//         No synchronizations for this entity yet
//       </div>
//     );
//   }
//   return (
//     <div className="max-w grid rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
//       <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
//         Last synchronization
//       </h5>
//       <p className="text-base font-bold text-gray-700 dark:text-gray-400">
//         Date:{' '}
//         <span className="font-normal text-gray-700">
//           {isoToDateString(sync?.updated_at || '')}
//         </span>
//       </p>
//       {sync?.status === 'failed' && (
//         <>
//           <p className="text-base font-bold text-gray-700 dark:text-gray-400">
//             Status: <span className="text-error">Failed</span>
//           </p>
//           <p className="gap-0 text-base font-bold text-gray-700 dark:text-gray-400">
//             Error message:
//           </p>
//           <p>{sync?.summary.errMessage}</p>
//         </>
//       )}
//       {sync?.status === 'finished' && (
//         <>
//           <p className="text-base font-bold text-gray-700 dark:text-gray-400">
//             Status: <span className="text-success">Finished</span>
//           </p>
//           <p className="gap-0 text-base font-bold text-gray-700 dark:text-gray-400">
//             Entities synced: {sync?.summary.entitiesSynced}
//           </p>
//         </>
//       )}
//       {sync?.status === 'started' && (
//         <>
//           <p className="text-base font-bold text-gray-700 dark:text-gray-400">
//             Status: <span className="text-secondary">Running</span>
//           </p>
//         </>
//       )}
//     </div>
//   );
// }, isEqual);

// interface SyncOverviewSettingsHelpModalProps {
//   openModal: boolean;
//   entitySettingInView: IProviderEntityDepSettings | undefined;
//   dependency: IProviderEntityDependency | undefined;
//   onClose: () => void;
// }

// // eslint-disable-next-line react/display-name
// const SyncOverviewSettingsHelpModal = memo(
//   (props: SyncOverviewSettingsHelpModalProps) => {
//     const [isOpen, setOpenModal] = useState(false);
//     const { openModal, onClose, entitySettingInView, dependency } = props;

//     const { data: exampleData } = useGetEntitiesQueryWithType(
//       {
//         providerId: dependency?.provider || '',
//         entityLabel: dependency?.entity || '',
//         limit: 5
//       },
//       { skip: !dependency?.provider || !dependency?.entity }
//     );
//     // const exampleData = [];
//     console.log(exampleData);

//     useEffect(() => {
//       setOpenModal(openModal);
//     }, [openModal]);

//     console.log(entitySettingInView);
//     console.log(dependency);

//     const exampleValue = useMemo(() => {
//       if (!exampleData || !dependency?.depSettingsId) return '';
//       return exampleData
//         ?.map((data: any) => data[`${dependency?.depSettingsId}`])
//         .join(', ');
//     }, [exampleData, dependency?.depSettingsId]);

//     console.log(exampleValue);

//     return (
//       <Modal show={isOpen} onClose={onClose}>
//         <Modal.Header>Example data</Modal.Header>
//         <Modal.Body>
//           {exampleData === undefined ||
//             (exampleData.length === 0 && (
//               <p>
//                 No example data available. Please try to sync the{' '}
//                 <strong>{dependency?.title}</strong> first.
//               </p>
//             ))}
//           {exampleData && exampleData.length > 0 && (
//             <>
//               <div className="space-y-6">
//                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                   Below you can find example of minified data set for the input
//                   & parsed example output which can be used as value in
//                   synchronization settings
//                 </p>
//                 <div>
//                   <div className="mb-2 block">
//                     <Label value="Example data" />
//                   </div>
//                   {exampleData && (
//                     <JsonView
//                       data={exampleData}
//                       shouldExpandNode={allExpanded}
//                       style={defaultStyles}
//                     />
//                   )}
//                 </div>
//                 <div>
//                   {entitySettingInView && exampleValue && (
//                     <TextField
//                       fieldSettings={entitySettingInView}
//                       readonly={true}
//                       value={exampleValue}
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </Modal.Body>
//       </Modal>
//     );
//   },
//   isEqual
// );

// interface SyncOverviewSettingsProps {
//   entity: IProviderEntity;
//   readonly: boolean;
// }

// // eslint-disable-next-line react/display-name
// const SyncOverviewSettings = React.forwardRef<any, SyncOverviewSettingsProps>(
//   (props, ref) => {
//     const { entity, readonly } = props;
//     const [openModal, setOpenModal] = useState(false);
//     const [entitySettingInView, setEntitySettingInView] = useState<
//       IProviderEntityDepSettings | undefined
//     >(undefined);
//     const [dependencySettingsInView, setDependencySettingsInView] = useState<
//       IProviderEntityDependency | undefined
//     >(undefined);

//     const entities = useSelector((state: RootState) => state.userEntities.data);

//     console.log('rerender', entity);

//     let generalSettingsSchema: IProviderEntityDepSettings[] = [
//       {
//         id: 'overwrite',
//         propKey: 'overwrite',
//         label: 'Overwrite',
//         type: 'boolean',
//         required: false,
//         // pattern: '^[0-9]+$',
//         // placeholder: 'E.g. CHAT,SENT,Label123',
//         // errorText: 'Please enter a valid label ID',
//         disabled: true,
//         isChecked: true
//       },
//       {
//         id: 'limit',
//         propKey: 'limit',
//         label: 'Limit (100)',
//         type: 'boolean',
//         required: false,
//         // pattern: '^[0-9]+$',
//         // placeholder: 'E.g. CHAT,SENT,Label123',
//         // errorText: 'Please enter a valid label ID',
//         disabled: true,
//         isChecked: true
//       },
//       {
//         id: 'multi',
//         propKey: 'multi',
//         label: 'Many',
//         type: 'boolean',
//         required: false,
//         // pattern: '^[0-9]+$',
//         // placeholder: 'E.g. CHAT,SENT,Label123',
//         // errorText: 'Please enter a valid label ID',
//         disabled: true,
//         isChecked: entity.multi || false
//       }
//     ];

//     const HelpButton = ({
//       settings,
//       dependency
//     }: {
//       settings: IProviderEntityDepSettings;
//       dependency: IProviderEntityDependency;
//     }): React.ReactNode => (
//       <button
//         className="btn btn-md h-[42px] min-h-[42px]"
//         onClick={() => {
//           console.log('help');
//           setOpenModal(true);
//           setEntitySettingInView(settings);
//           setDependencySettingsInView(dependency);
//         }}>
//         Help
//       </button>
//     );

//     const res = useMemo(() => {
//       if (!entity.dependsOn || !entities) return [];

//       return entity.dependsOn
//         .map((dependency): DependencySettingWithHelpButton | null => {
//           const foundEntity = entities.find(
//             (ent) => ent.id === dependency.entity
//           );
//           if (!foundEntity) return null;

//           const { depSettings } = foundEntity || [];
//           const foundSettings = depSettings.find((settings) => {
//             return settings.propKey === dependency.depSettingsId;
//           });
//           if (!foundSettings) return null;

//           return {
//             ...foundSettings,
//             id: foundEntity.id,
//             helpButton: () =>
//               !readonly
//                 ? HelpButton({ settings: foundSettings, dependency })
//                 : undefined
//           };
//         })
//         .filter((dep) => !!dep) as DependencySettingWithHelpButton[];
//     }, [entity.dependsOn, entities, readonly]);
//     console.log(res);

//     generalSettingsSchema = generalSettingsSchema.map((setting) => ({
//       ...setting,
//       helpButton: undefined
//     })) as DependencySettingWithHelpButton[];

//     const closeFn = useCallback(() => {
//       setOpenModal(false);
//       setEntitySettingInView(undefined);
//       setDependencySettingsInView(undefined);
//     }, []);

//     return (
//       <>
//         <SyncOverviewSettingsHelpModal
//           openModal={openModal}
//           entitySettingInView={entitySettingInView}
//           dependency={dependencySettingsInView}
//           onClose={closeFn}
//         />
//         <SyncsSettingsForm
//           generalDepSettings={generalSettingsSchema}
//           entityDepSettings={res}
//           readonly={readonly}
//           ref={ref}></SyncsSettingsForm>
//       </>
//     );
//   }
// );

// interface ModalProps {
//   openModal: string | undefined;
//   syncId: ISynchronization['_id'] | undefined;
//   entityInViewID: string | undefined;
//   providerKeyInView: string | undefined;
//   onClose: () => void;
//   historyMode?: boolean;
// }

// interface IFormInputs {
//   generalSettings: {
//     limit?: boolean;
//     overwrite: boolean;
//   };
//   entitySettings: any;
// }

// const SyncOverviewModal = memo(function DefaultModal({
//   openModal,
//   onClose,
//   syncId,
//   entityInViewID,
//   providerKeyInView,
//   historyMode = false
// }: ModalProps) {
//   console.log('syncId', syncId);
//   console.log('entityInViewID', entityInViewID);

//   const [runSynchronization, { isLoading: isSyncing }] =
//     useRunSynchronizationMutation();

//   const entity = useSelector((state: RootState) =>
//     state.userEntities.data.find((entity) => entity.id === entityInViewID)
//   );
//   const sync = useSelector((state: RootState) =>
//     state.userSyncs.data.find((sync) => sync._id === syncId)
//   );

//   const formRef = createRef<{
//     getFormState: () => any;
//     getFormErrors: () => any;
//     validateForm: () => FormErrors;
//   }>();

//   const closeFn = useCallback(() => {
//     onClose();
//   }, [onClose]);

//   const syncFn = useCallback(
//     async (entity: IProviderEntity | undefined, syncSettings: IFormInputs) => {
//       console.log('sync', entity);
//       if (!entity || !providerKeyInView) return;

//       console.log({
//         providerId: providerKeyInView,
//         entityLabel: entity.id,
//         ...syncSettings
//       });
//       await runSynchronization({
//         providerId: providerKeyInView,
//         entityLabel: entity.id,
//         ...syncSettings
//       })
//         .unwrap()
//         .then((res) => {
//           console.log(res);
//           toast.custom((t) => (
//             <Toasty t={t} type="success" message="Synced successfully" />
//           ));
//           closeFn();
//         })
//         .catch((err) => {
//           toast.custom((t) => (
//             <Toasty t={t} type="error" message="Synced unsuccessfully" />
//           ));
//         });
//     },
//     [runSynchronization, providerKeyInView, closeFn]
//   );

//   if (!entity) return null;

//   return (
//     <>
//       <Modal show={openModal === 'dismissible'} onClose={closeFn}>
//         <Modal.Header>
//           <div>Overview</div>
//           <div className="text-sm">Entity: {entity?.title}</div>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="grid gap-2">
//             {!historyMode && <SyncOverviewDetails entity={entity} />}
//             <SyncOverviewLastStatus sync={sync} />
//             <SyncOverviewSettings
//               entity={entity}
//               readonly={historyMode}
//               ref={formRef}
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           {!historyMode && (
//             <SyncButton
//               disabled={false}
//               lastStatus={sync?.status || ''}
//               isLoading={isSyncing}
//               onClick={() => {
//                 // console.log(syncSettings);
//                 console.log(formRef.current?.getFormState());
//                 console.log(formRef.current?.validateForm());
//                 console.log(formRef.current?.getFormErrors());
//                 const validation = formRef.current?.validateForm();

//                 if (validation && Object.values(validation).length > 0) return;

//                 // const errorsObj = formRef.current?.getFormErrors();
//                 // if (Object.keys(errorsObj).length > 0) return;

//                 const settings = formRef.current?.getFormState();

//                 if (
//                   entity.dependsOn.length > 0 &&
//                   Object.keys(settings?.entitySettings).length === 0
//                 )
//                   return;

//                 syncFn(entity, settings);
//               }}
//             />
//           )}
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// });

// export default SyncOverviewModal;
