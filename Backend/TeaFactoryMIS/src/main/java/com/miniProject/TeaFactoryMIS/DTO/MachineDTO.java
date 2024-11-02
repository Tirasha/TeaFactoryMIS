package com.miniProject.TeaFactoryMIS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Data Transfer Object (DTO) class for Machines

@AllArgsConstructor
@NoArgsConstructor
@Data

public class MachineDTO {
    private String machine_id;
    private String machine_type;
    private String machine_quantity;
    private String machine_availablity;
}
