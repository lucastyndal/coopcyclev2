package com.mycompany.myapp.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DeliveryManMapperTest {

    private DeliveryManMapper deliveryManMapper;

    @BeforeEach
    public void setUp() {
        deliveryManMapper = new DeliveryManMapperImpl();
    }
}
