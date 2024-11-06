package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.BasicNotFoundException;
import com.miniProject.TeaFactoryMIS.Exception.FertilizerNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.BasicRepository;
import com.miniProject.TeaFactoryMIS.model.Basics;
import jakarta.persistence.Basic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BasicController {
    @Autowired
    private BasicRepository basicRepository;

    @PostMapping("/basicAdd")
    public Basics newBasics(@RequestBody Basics newBasics){
        return basicRepository.save(newBasics);
    }

    @GetMapping("/basicGetAll")
    List<Basics> getAllBasics(){
        return basicRepository.findAll();
    }

    @GetMapping("/basicGetById/{basicId}")
    Basics getBasicById(@PathVariable String basicId){
        return basicRepository.findById(basicId)
                .orElseThrow(()->new BasicNotFoundException(basicId));
    }

    @PutMapping("/basicUpdate/{basicId}")
    Basics updateBasics(@RequestBody Basics newBasics, @PathVariable String basicId){
        return basicRepository.findById(basicId)
                .map(basics -> {
                    basics.setRole(newBasics.getRole());
                    basics.setBasicAmount(newBasics.getBasicAmount());
                    basics.setDayPayment(newBasics.getDayPayment());
                    return basicRepository.save(basics);
                }).orElseThrow(()->new BasicNotFoundException(basicId));
    }

    @DeleteMapping("/basicDelete/{basicId}")
    String deleteBasics(@PathVariable String basicId){
        if (!basicRepository.existsById(basicId)){
            throw new BasicNotFoundException(basicId);
        }
        basicRepository.deleteById(basicId);
        return "Baisc detail with ID "+basicId+"has been deleted Succesfully";
    }


}
