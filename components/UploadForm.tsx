import axios from "axios";
import {
  Box,
  Button,
  FileInput,
  Form,
  FormField,
  Spinner,
  TextArea,
  TextInput,
  Video,
} from "grommet";
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useModal, DialogChildContent } from "../context/ModalContext";
import { Post } from "../models/Post";

export const UploadForm: React.FC<{}> = () => {
  const defaultFormValue = {
    video: [],
    title: "",
    description: "",
  };

  const { addToFeed } = useAppContext();
  const { handleDialogModal } = useModal();

  const [formValue, setFormValue] = useState(defaultFormValue);
  const [formLoading, setFormLoading] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  const resetFormData = () => {
    setPreviewVideoUrl(null);
    setFormValue(defaultFormValue);
  };

  const showDialog = ({ body, title, button }: DialogChildContent) => {
    handleDialogModal({
      method: "open",
      child: { title, body, button },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormLoading(true);

    const payload = new FormData();
    payload.append("video", e.value.video[0]);
    payload.append("title", e.value.title);
    payload.append("description", e.value?.description);

    await axios
      .post("/api/post/upload", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const newFeed: Post = response.data;
        newFeed.createdAt = new Date(newFeed.createdAt);
        addToFeed(response.data);
        showDialog({ title: "Sukses", body: "Berhasil mengunggah video" });
        resetFormData();
      })
      .catch((_err) => {
        showDialog({
          title: "Terjadi Kesalahan",
          body: "Gagal mengunggah video",
        });
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <Form
      encType="multipart/form-data"
      value={formValue}
      onChange={(value) => setFormValue(value)}
      onReset={() => setFormValue(defaultFormValue)}
      onSubmit={handleSubmit}
      validate="blur"
    >
      <Box flex="grow" gap="medium" pad={{ vertical: "medium" }}>
        <FormField name="video" required>
          <FileInput
            name="video"
            multiple={false}
            accept="video/*"
            onChange={(event) => {
              const file = event.target.files[0];
              const blob = URL.createObjectURL(file);
              setPreviewVideoUrl(blob);
            }}
            messages={{
              browse: "Jelajahi",
              dropPrompt: "Upload video ",
            }}
          />
        </FormField>
        {previewVideoUrl && (
          <Video
            controls="below"
            fit="cover"
            color="black"
            src={previewVideoUrl}
          />
        )}
        <FormField name="title" required>
          <TextInput name="title" placeholder="Judul konten" />
        </FormField>
        <FormField name="description">
          <TextArea name="description" placeholder="Deskripsi vidio" />
        </FormField>
      </Box>
      <Box
        direction="row-responsive"
        justify="between"
        align="center"
        as="footer"
      >
        <Button type="submit" disabled={formLoading} label="Publish" primary />
        {formLoading && <Spinner />}
      </Box>
    </Form>
  );
};
