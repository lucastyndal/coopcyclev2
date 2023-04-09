package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeliveryManDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryManDTO.class);
        DeliveryManDTO deliveryManDTO1 = new DeliveryManDTO();
        deliveryManDTO1.setId(1L);
        DeliveryManDTO deliveryManDTO2 = new DeliveryManDTO();
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
        deliveryManDTO2.setId(deliveryManDTO1.getId());
        assertThat(deliveryManDTO1).isEqualTo(deliveryManDTO2);
        deliveryManDTO2.setId(2L);
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
        deliveryManDTO1.setId(null);
        assertThat(deliveryManDTO1).isNotEqualTo(deliveryManDTO2);
    }
}
