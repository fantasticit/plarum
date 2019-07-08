import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type Props = {
  value?: any;
  onChange?: any;
};

export const MDEditor: React.FC<Props> = (props: Props) => {
  const { value, onChange = () => {} } = props;

  return <SimpleMDE value={value} onChange={onChange} />;
};
