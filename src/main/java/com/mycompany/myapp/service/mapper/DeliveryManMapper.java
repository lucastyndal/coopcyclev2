package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.DeliveryMan;
import com.mycompany.myapp.service.dto.DeliveryManDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link DeliveryMan} and its DTO {@link DeliveryManDTO}.
 */
@Mapper(componentModel = "spring")
public interface DeliveryManMapper extends EntityMapper<DeliveryManDTO, DeliveryMan> {}
