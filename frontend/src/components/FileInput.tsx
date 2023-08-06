import { forwardRef, useState } from "react";
import styled from "styled-components";

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: 16px;

  border: 2px solid #1570ef;
  outline: none;
  color: #1570ef;

  transition: all 0.3s ease-in-out;

  p {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
  }

  &:hover {
    background-color: #1570ef;
    cursor: pointer;

    p {
      color: white;
    }
  }
`;

interface IFileInputProp {
  buttonText: string;
}

type FileInputRef = HTMLInputElement;

const FileInput = forwardRef<FileInputRef, IFileInputProp>((props, ref) => {
  const [filename, setFilename] = useState("");

  const fileChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      setFilename(e.currentTarget.files[0].name);
    }
  };

  return (
    <>
      <input
        type="file"
        id="file-upload"
        hidden
        ref={ref}
        onChange={fileChangeHandler}
      />
      <FileUploadButton htmlFor="file-upload">
        <p>{filename || props.buttonText}</p>
      </FileUploadButton>
    </>
  );
});

export default FileInput;
