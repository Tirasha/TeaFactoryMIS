package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.EpfEtfNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.EPF_ETFRepository;
import com.miniProject.TeaFactoryMIS.model.EPFETF;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EPF_ETFController {
    @Autowired
    private EPF_ETFRepository epfEtfRepository;

    @PostMapping("/epfetfAdd")
    public EPFETF newEPFETF(@RequestBody EPFETF newEPFETF){
        return epfEtfRepository.save(newEPFETF);
    }

    @GetMapping("/epfetfGet")
    List<EPFETF> getAllEPFETF(){
        return epfEtfRepository.findAll();
    }

    @GetMapping("/epfetfGetById/{epf_etfId}")
    EPFETF getEpfEtfById(@PathVariable String epf_etfId){
        return epfEtfRepository.findById(epf_etfId)
                .orElseThrow(()->new EpfEtfNotFoundException(epf_etfId));
    }

    @DeleteMapping("/epfetfDelete/{epf_etfId}")
    String deleteEpfEtf(@PathVariable String epf_etfId){
        if (!epfEtfRepository.existsById(epf_etfId)){
            throw new EpfEtfNotFoundException(epf_etfId);
        }
        else {
            epfEtfRepository.deleteById(epf_etfId);
        }
        return "Epf and Etf detail with ID "+epf_etfId+"has been deleted Succesfully";

    }




}
