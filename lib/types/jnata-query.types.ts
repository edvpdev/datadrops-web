export interface IJnataQuery {
  _id: string;
  userId: string;
  title: string;
  jsonNataQuery: string;
}

export interface IJnataQueryCreatePayload
  extends Omit<IJnataQuery, '_id' | 'userId'> {}
