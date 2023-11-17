import { Button, Col, FormControl, FormSelect, Row } from "react-bootstrap";
import style from "./Main.module.css";
import { useFormik } from "formik";
import { useContext, useEffect, useRef } from "react";
import { GenerateContext } from "../../context/GenerateContext";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const Main = () => {
  const {
    generateImgs,
    imgs,
    setImgs,
    loading,
    error,
    generateText,
    audioUrl,
    setAudioUrl
  } = useContext(GenerateContext);
  const isMount = useRef(false);
  useEffect(() => {
    if (error) {
      if (!isMount.current) {
        console.log("Heelllo");
        toast.error("Please try again after 1 min");
        isMount.current = true;
      }
    }
  }, [error]);
  const formik = useFormik({
    initialValues: {
      ai: "image",
      imgs: "",
      text: "",
    },
  });

  // const isMount = useRef(false)
  // useEffect(() => {
  //   if(!isMount.current) {
  //     generateImgs('messi watches tv')
  //     isMount.current = true
  //   }
  // } , [])
  console.log(formik.values.imgs);
  return (
    <div className={style.main}>
      <div
        className={`container ${style.hello} mx-2 mx-md-0 d-flex justify-content-center align-items-center  flex-column `}
      >
        <div className="d-flex w-100 justify-content-center align-items-center gap-4 ">
          <h3 className={style.select}>Select the service you want</h3>
          <FormSelect
            name="ai"
            id="ai"
            className="w-25"
            onChange={formik.handleChange}
            value={formik.values.ai}
          >
            <option value="image">Image Generation</option>
            <option value="tts">Text to Speech</option>
          </FormSelect>
        </div>
        <div
          className={`${style.choosen}d-flex align-items-center w-100 justify-content-center `}
        >
          <AnimatePresence>
            {formik.values.ai === "image" ? (
              <motion.div
                key="image"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                }}
                className={style.im}
              >
                <Row className="justify-content-center align-content-center flex-row my-3">
                  <Col lg="4" md="5" xs="5" className="m-0 p-0">
                    <FormControl
                      value={formik.values.imgs}
                      onChange={formik.handleChange}
                      name="imgs"
                      id="imgs"
                      placeholder="Enter image prompt"
                    />
                  </Col>
                  <Col lg="1" md="1" xs="1">
                    <Button
                      disabled={!formik.values.imgs.trim()}
                      onClick={() => {
                        formik.setFieldValue("imgs", "");
                        setImgs([]);
                        generateImgs(formik.values.imgs);
                      }}
                    >
                      Generate
                    </Button>
                  </Col>
                </Row>
                <Row
                  lg="4"
                  md="3"
                  sm="2"
                  xs="1"
                  className={`${style.images} gap-2 justify-content-center align-items-center  m-0 `}
                >
                  {loading ? (
                    <>
                      <Col xs="8" className={style.img}>
                        <div className="loader"></div>
                      </Col>
                      <Col xs="8" className={style.img}>
                        <div className="loader"></div>
                      </Col>
                      <Col xs="8" className={style.img}>
                        <div className="loader"></div>
                      </Col>
                    </>
                  ) : (
                    ""
                  )}
                  {imgs && imgs.length > 0 ? (
                    <>
                      <Col xs="8" className={style.img}>
                        <img src={imgs[0].url} alt="" />
                      </Col>
                      <Col xs="8" className={style.img}>
                        <img src={imgs[1].url} alt="" />
                      </Col>
                      <Col xs="8" className={style.img}>
                        <img src={imgs[2].url} alt="" />
                      </Col>
                    </>
                  ) : !loading ? (
                    <>
                      <Col xs="8" className={style.img}></Col>
                      <Col xs="8" className={style.img}></Col>
                      <Col xs="8" className={style.img}></Col>
                    </>
                  ) : (
                    ""
                  )}
                </Row>
              </motion.div>
            ) : formik.values.ai === "tts" ? (
              <motion.div
                key="tts"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                }}
                className={style.im}
              >
                <Row
                  xs="2"
                  className="justify-content-center mx-auto align-content-center flex-row my-3"
                >
                  <Col>
                    <FormControl
                      value={formik.values.text}
                      onChange={formik.handleChange}
                      name="text"
                      id="text"
                      placeholder="Enter text"
                    />
                  </Col>
                  <Col xs="2">
                    <Button
                      disabled={!formik.values.text.trim()}
                      onClick={() => {
                        generateText(formik.values.text);
                        formik.setFieldValue('text' , '')
                        setAudioUrl('')
                      }}
                    >
                      Generate
                    </Button>
                  </Col>
                </Row>
                <div className="d-flex w-100 justify-content-center ">
                {loading ? <div className="loader"></div> :  
                  <audio controls src={audioUrl} />
                }
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Main;
