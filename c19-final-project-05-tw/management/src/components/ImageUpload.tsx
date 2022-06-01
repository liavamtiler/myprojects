import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styles from "../css/SubItemImagePage.module.css";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

interface SubItemImage {
  id: number;
  image_path: string;
  status: boolean;
}

function ImageUpload() {
  const { sid: subItemId } = useParams();
  const [subItemImages, setSubItemImages] = useState<SubItemImage[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `${REACT_APP_BACKEND_URL}/subItemImages/${subItemId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const result = await data.json();
      setSubItemImages(result);
    };

    fetchData();
  }, [subItemId]);

  const imageHandler = async () => {
    const imageInput = imageRef.current;
    if (imageInput?.files) {
      const formData = new FormData();
      formData.append("subitem_id", subItemId!);
      formData.append("subitemImg", imageInput.files[0]);

      const data = await fetch(`${REACT_APP_BACKEND_URL}/uploadSubitemImage`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      const result = await data.json();
      setSubItemImages([...subItemImages, result]);
    }
  };

  const onImageRemove = async (imageId: number) => {
    const result = await fetch(`${REACT_APP_BACKEND_URL}/deleteImage`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageId,
      }),
    });
    const resp = await result.json();

    setSubItemImages([
      ...subItemImages.filter((image) => image.id != resp[0].id),
    ]);
  };

  return (
    <div>
      <Box className="upload-image">
        <Box sx={{ padding: "10px",display:"flex",justifyContent:"center"}}>
          <input
            ref={imageRef}
            onChange={imageHandler}
            className={styles.customFileInput}
            type="file"
          />
        </Box>

        {/* DOM */}

        <Box p={1} sx={{ marginBottom: "50%" }}>
          {/* LOOP START */}
          {subItemImages.map((image) => (
            <Box sx={{ mb: "5px" }}>
              <Card className={styles.blur1} key={`image_${image.id}`}>
                <React.Fragment>
                  <CardContent
                    sx={{
                      border: "0.1px solid white",
                      borderBottom: "0px",
                      borderRadius: "5px 5px 0px 0px",
                      padding: "5px",
                    }}
                  >
                    <img
                      src={`${REACT_APP_BACKEND_URL}/${image.image_path}`}
                      alt=""
                      width="100%"
                    />
                  </CardContent>

                  <CardActions
                    sx={{
                      border: "0.1px solid white",
                      borderTop: "0px",
                      borderRadius: "0px 0px 5px 5px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "end",
                      padding: "0px 16px 8px 16px",
                    }}
                  >
                    <Button
                      size="small"
                      id="demo-positioned-button"
                      onClick={() => onImageRemove(image.id)}
                      sx={{
                        borderRadius: "10px",
                        border: "1px solid black",
                        padding: "3px 15px 3px 15px",
                        bgcolor: "#022A54",
                        color: "white",
                        minWidth: "fit-content",
                        width: "35%",
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </React.Fragment>
              </Card>
            </Box>
          ))}

          {/* LOOP END */}
        </Box>
      </Box>
    </div>
  );
}
export default ImageUpload;
