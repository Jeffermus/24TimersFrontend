package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/create/sogn")
    public String create(){
        return "createSogn";
    }

    @GetMapping("/get/sogn")
    public String get(){
        return "getSogn";
    }

    @GetMapping("/update/sogn/{id}")
    public String update(){
        return "updateSogn";
    }

    @GetMapping("/")
    public String index(){
        return "indexListe";
    }
}
