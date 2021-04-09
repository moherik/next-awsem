import axios from "axios";
import {
  Box,
  Button,
  FileInput,
  Form,
  FormField,
  Heading,
  Layer,
  Spinner,
  TextArea,
  TextInput,
  Video,
} from "grommet";
import { Close } from "grommet-icons";
import React, { useState } from "react";
import { usePostContext } from "../context/PostContext";
import { Post } from "../models/Post";

export const UploadDialog: React.FC<{}> = () => {
  const defaultFormValue = {
    video: [],
    title: "",
    description: "",
  };

  const { open, closeDialog, addToFeed } = usePostContext();

  const [formValue, setFormValue] = useState(defaultFormValue);
  const [formLoading, setFormLoading] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  const onClose = () => {
    resetFormData();
  };

  const resetFormData = () => {
    setPreviewVideoUrl(null);
    setFormValue(defaultFormValue);
    closeDialog();
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
        console.log(newFeed);
        addToFeed(response.data);
        resetFormData();
      })
      .catch((err) => console.error(err.response.data))
      .finally(() => setFormLoading(false));
  };

  return (
    <>
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box fill="vertical" overflow="auto" width="medium" pad="medium">
            <Box flex={false} direction="row" justify="between">
              <Heading level={2} margin="none">
                Upload Video
              </Heading>
              <Button icon={<Close />} onClick={onClose} />
            </Box>
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
                    onChange={(event) => {
                      const file = event.target.files[0];
                      const blob = URL.createObjectURL(file);
                      setPreviewVideoUrl(blob);
                    }}
                    messages={{
                      browse: "Jelajahi",
                      dropPrompt: "Seret vidio ke sini atau ",
                    }}
                  />
                </FormField>
                {previewVideoUrl && (
                  <Video controls="below" fit="cover" color="black">
                    <source key="video" src={previewVideoUrl} />
                  </Video>
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
                <Button
                  type="submit"
                  disabled={formLoading}
                  label="Post"
                  primary
                />
                {formLoading && <Spinner />}
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </>
  );
};
