package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.EpfEtfNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.EPF_ETFRepository;
import com.miniProject.TeaFactoryMIS.model.EPFETF;
import com.miniProject.TeaFactoryMIS.model.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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
    EPFETF getEpfEtfById(@PathVariable Long epf_etfId){
        return epfEtfRepository.findById(epf_etfId)
                .orElseThrow(()->new EpfEtfNotFoundException(epf_etfId));
    }




}
