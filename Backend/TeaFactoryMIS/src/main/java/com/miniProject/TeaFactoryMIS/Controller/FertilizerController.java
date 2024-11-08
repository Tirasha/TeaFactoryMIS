package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Repository.FertilizerRepository;
import com.miniProject.TeaFactoryMIS.Service.FertilizerService;
import com.miniProject.TeaFactoryMIS.model.Fertilizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class FertilizerController {

    @Autowired
    private FertilizerRepository fertilizeRepo;

    @Autowired
    private FertilizerService fertilizerService;

    @GetMapping("/fertilizer/Fertilizer_stock_summary")
    public ResponseEntity<List<Map<String, Object>>> getFertilizerStockSummary(){
        List<Map<String,Object>> fertilizerSummary =fertilizerService.getFertilizerStockSummary();
        return ResponseEntity.ok(fertilizerSummary);
    }


    @GetMapping("/fertilizer/deleted_fertilizer_history")
    public ResponseEntity<List<Map<String, Object>>> getDeletedFertilizer(){
        List<Map<String,Object>> Deletedfertilizer =fertilizerService.getDeletedFertilizer();
        return ResponseEntity.ok(Deletedfertilizer);
    }
    @PostMapping("/fertilizer/add")
    Fertilizer newFertilizer (@RequestBody Fertilizer newFertilizer)
    {
        return fertilizeRepo.save(newFertilizer);
    }

    @GetMapping("/fertilizer/all")
    List<Fertilizer> getAllFertilizer()
    {
        return fertilizeRepo.findAll();
    }

    @GetMapping("/fertilizer/get/{fer_id}")
    Fertilizer getFertilizerById(@PathVariable String fer_id)
    {
        return fertilizeRepo.findById(fer_id)
                .orElseThrow(()-> new NullPointerException(fer_id));
    }

    @PutMapping("/fertilizer/edit/{fer_id}")
    Fertilizer updateFertilizer(@RequestBody Fertilizer newFertilizer,@PathVariable String fer_id)
    {
        return fertilizeRepo.findById(fer_id)
                .map(fertilizer -> {
                    fertilizer.setName(newFertilizer.getName());
                    fertilizer.setQuantity(newFertilizer.getQuantity());
                    return  fertilizeRepo.save(fertilizer);
                }).orElseThrow(()-> new NullPointerException(fer_id));
    }

    @DeleteMapping("/fertilizer/delete/{fer_id}")
    String deleteFertilizer(@PathVariable String fer_id)
    {
        if (!fertilizeRepo.existsById(fer_id))
        {
            throw  new NullPointerException(fer_id);
        }
        fertilizeRepo.deleteById(fer_id);
        return "Fertilizer with id :" +fer_id+ "has been deleted success.";
    }
}
