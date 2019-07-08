export interface ITag {
  id: string;
  label: string;
  value: string;
}

export interface ITagState {
  tags?: ITag[];
}
