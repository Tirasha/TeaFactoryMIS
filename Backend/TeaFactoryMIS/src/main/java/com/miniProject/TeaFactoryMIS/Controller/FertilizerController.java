package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.FertilizerNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.FertilizerRepository;
import com.miniProject.TeaFactoryMIS.model.Fertilizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FertilizerController {
    @Autowired
    private FertilizerRepository fertilizerRepo;

    @PostMapping("/fertilizerAdd")
    Fertilizer newFertilizer (@RequestBody Fertilizer newFertilizer)
    {
        return fertilizerRepo.save(newFertilizer);
    }

    @GetMapping("/fertilizerGet")
    List<Fertilizer> getAllFertilizer()
    {
        return fertilizerRepo.findAll();
    }

    @GetMapping("/fertilizerGetById/{Fer_ID}")
    Fertilizer getFertilizerById(@PathVariable String Fer_ID)
    {
        return fertilizerRepo.findById(Fer_ID)
                .orElseThrow(()-> new FertilizerNotFoundException(Fer_ID));
    }


    @PutMapping("/fertilizerEdit/{Fer_ID}")
    Fertilizer updateFertilizer(@RequestBody Fertilizer newFertilizer,@PathVariable String Fer_ID)
    {
        return fertilizerRepo.findById(Fer_ID)
                .map(fertilizer -> {
                    fertilizer.setName(newFertilizer.getName());
                    fertilizer.setQuantity(newFertilizer.getQuantity());
                    fertilizer.setType(newFertilizer.getType());
                    return  fertilizerRepo.save(fertilizer);
                }).orElseThrow(()-> new FertilizerNotFoundException(Fer_ID));
    }

    @DeleteMapping("/fertilizerDelete/{Fer_ID}")
    String deleteFertilizer(@PathVariable String Fer_ID)
    {
        if (!fertilizerRepo.existsById(Fer_ID))
        {
            throw  new FertilizerNotFoundException(Fer_ID);
        }
        fertilizerRepo.deleteById(Fer_ID);
        return "Fertilizer with id :" +Fer_ID+ "has been deleted success.";
    }






}
