import axios from "axios";
import { Box, Button, Form, FormField, Spinner, TextInput } from "grommet";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { useModal } from "../context/ModalContext";
import { Profile } from "../pages/user/index";

export const UpdateProfileForm: React.FC<{
  user: Profile;
  onComplete: () => void;
}> = ({ user, onComplete }) => {
  const { handleDialogModal } = useModal();
  const [session] = useSession();
  const [formLoading, setFormLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
  });

  const handleUpdateProfile = async () => {
    setFormLoading(true);

    if (session.user.email != user.email) return false;

    await axios
      .patch("/api/user/update", formValue)
      .then((response) => {
        onComplete();
        handleDialogModal({
          method: "open",
          child: { title: "Sukses", body: "Berhasil mengubah profil" },
        });
      })
      .catch((err) => console.error(err.response.data))
      .finally(() => setFormLoading(false));
  };

  return (
    <Form
      value={formValue}
      onChange={(value) => setFormValue(value)}
      onSubmit={() => handleUpdateProfile()}
    >
      <Box margin={{ top: "small" }}>
        <FormField name="name" required label="Nama">
          <TextInput name="name" />
        </FormField>
        <FormField name="username" label="Nama Pengguna">
          <TextInput name="username" placeholder="username" />
        </FormField>
        <FormField name="bio" label="Bio">
          <TextInput name="bio" placeholder="Tentang saya" />
        </FormField>
      </Box>

      <Box
        direction="row-responsive"
        justify="between"
        align="center"
        as="footer"
        margin={{ top: "small" }}
      >
        <Button type="submit" disabled={formLoading} label="Ubah" primary />
        {formLoading && <Spinner />}
      </Box>
    </Form>
  );
};
