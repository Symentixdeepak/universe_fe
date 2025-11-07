export interface Connection {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
}

export type SelectionPosition = "first" | "second" | "third";

export interface SelectedConnections {
  first?: Connection;
  second?: Connection;
  third?: Connection;
}

export interface SelectionFlags {
  firstSelected: boolean;
  secondSelected: boolean;
  thirdSelected: boolean;
}