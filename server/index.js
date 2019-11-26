var express = require('express')
ms = require('mediaserver');

app=express()

app.get('/music.mp3', function(req, res){
    ms.pipe(req, res, './BeepBox-Song_4.mp3');
  });

app.get('/die.mp3', function(req, res){
    ms.pipe(req, res, './8d82b5_Pacman_Dies_Sound_Effect.mp3');
  });

app.get('/lose.mp3', function(req, res){
    ms.pipe(req, res, './Explosion+5.mp3');
  });

app.get('/lose1.mp3', function(req, res){
    ms.pipe(req, res, './Gun+357+Magnum.mp3');
  });

app.listen(8080,()=>{
    console.log("listening")
})
