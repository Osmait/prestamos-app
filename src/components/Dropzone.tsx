import { Button, Text } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useDropzone } from "react-dropzone";

const API = process.env.NEXT_PUBLIC_API;

export function DropZone({ id, closeHandler }: any) {
  const router = useRouter();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    console.log(formData);
    try {
      await axios.post(`${API}/client/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.reload();
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragAccept && <p>All files will be accepted</p>}
          {isDragReject && <p>Some files will be rejected</p>}
          {!isDragActive && <p>Drop some files here ...</p>}
        </div>
      </div>
      <Text>{files}</Text>

      <Button type="submit">Subir</Button>
    </form>
  );
}
