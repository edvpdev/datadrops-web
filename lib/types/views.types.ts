export interface IView {
  _id: string;
  userId: string;
  title: string;
  description: string;
  templateKey: string;
  jsonNataQuery: string;
  providerId: string;
  entityLabel: string;
}

export interface IViewCreatePayload extends Omit<IView, '_id' | 'userId'> {}

export interface IViewUpdatePayload
  extends Pick<IView, 'description' | 'jsonNataQuery'> {}
