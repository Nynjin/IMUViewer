import express from 'express';
import path from "path";

const app = express();
app.use(express.static(__dirname + '/public'));
app.use('/assets/', express.static(path.join(__dirname, 'public/assets')));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

app.listen(3000);