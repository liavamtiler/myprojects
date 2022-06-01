import React from "react";
import ImageUpload from "../components/ImageUpload";
import Navbar from "../components/Navbar";
import styles from "../css/SubItemImagePage.module.css";

export const SubItemImagePage = () => {
  return (
    <>
      <div className={styles.background}></div>
      <Navbar />

      <ImageUpload />
    </>
  );
};
