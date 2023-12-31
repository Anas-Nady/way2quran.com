// src/routes.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Reciters,
  Reciter,
  Login,
  FrequentRecitations,
  VariousRecitations,
  Dashboard,
  Contact,
  About,
  NotFound,
  AddReciter,
  AllReciters,
  UploadRecitation,
  AdminProfile,
  EditReciter,
  Messages,
  FrequentReciters,
  PreviewReciter,
} from "./pages";

const AppRoutes = ({ updateAudioPlayerData }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/completed-recitations"
      element={<Reciters updateAudioPlayerData={updateAudioPlayerData} />}
    />
    <Route
      path="/completed-recitations/:reciterSlug"
      element={<Reciter updateAudioPlayerData={updateAudioPlayerData} />}
    />
    <Route path="/frequent-recitations" element={<FrequentRecitations />} />
    <Route
      path="/frequent-recitations/:recitationSlug"
      element={<FrequentReciters />}
    />
    <Route
      path="/frequent-recitations/:recitationSlug/:reciterSlug"
      element={<Reciter updateAudioPlayerData={updateAudioPlayerData} />}
    />
    <Route path="/various-recitations" element={<VariousRecitations />} />
    <Route
      path="/various-recitations/:reciterSlug"
      element={<Reciter updateAudioPlayerData={updateAudioPlayerData} />}
    />
    <Route path="/login" element={<Login />} />
    <Route path="dashboard" element={<Dashboard />}>
      <Route index element={<AddReciter />} />
      <Route path="add-reciter" element={<AddReciter />} />
      <Route path="all-reciters" element={<AllReciters />} />
      <Route path="upload-recitation" element={<UploadRecitation />} />
      <Route path="edit-reciter/:reciterSlug" element={<EditReciter />} />
      <Route path="preview-reciter/:reciterSlug" element={<PreviewReciter />} />
      <Route path="messages" element={<Messages />} />
      <Route path="profile" element={<AdminProfile />} />
    </Route>
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
