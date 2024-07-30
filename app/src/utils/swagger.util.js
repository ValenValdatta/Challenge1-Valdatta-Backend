import __dirname from "../../utils.js";

const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "CODER API",
         description: "Documentation of CODER API CURSO BACKEND",
      },
   },
   apis: [__dirname + "/src/docs/*.yaml"],
};

export default options;
