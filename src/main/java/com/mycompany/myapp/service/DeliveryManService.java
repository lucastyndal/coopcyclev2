package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.DeliveryMan;
import com.mycompany.myapp.repository.DeliveryManRepository;
import com.mycompany.myapp.service.dto.DeliveryManDTO;
import com.mycompany.myapp.service.mapper.DeliveryManMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DeliveryMan}.
 */
@Service
@Transactional
public class DeliveryManService {

    private final Logger log = LoggerFactory.getLogger(DeliveryManService.class);

    private final DeliveryManRepository deliveryManRepository;

    private final DeliveryManMapper deliveryManMapper;

    public DeliveryManService(DeliveryManRepository deliveryManRepository, DeliveryManMapper deliveryManMapper) {
        this.deliveryManRepository = deliveryManRepository;
        this.deliveryManMapper = deliveryManMapper;
    }

    /**
     * Save a deliveryMan.
     *
     * @param deliveryManDTO the entity to save.
     * @return the persisted entity.
     */
    public DeliveryManDTO save(DeliveryManDTO deliveryManDTO) {
        log.debug("Request to save DeliveryMan : {}", deliveryManDTO);
        DeliveryMan deliveryMan = deliveryManMapper.toEntity(deliveryManDTO);
        deliveryMan = deliveryManRepository.save(deliveryMan);
        return deliveryManMapper.toDto(deliveryMan);
    }

    /**
     * Update a deliveryMan.
     *
     * @param deliveryManDTO the entity to save.
     * @return the persisted entity.
     */
    public DeliveryManDTO update(DeliveryManDTO deliveryManDTO) {
        log.debug("Request to update DeliveryMan : {}", deliveryManDTO);
        DeliveryMan deliveryMan = deliveryManMapper.toEntity(deliveryManDTO);
        deliveryMan = deliveryManRepository.save(deliveryMan);
        return deliveryManMapper.toDto(deliveryMan);
    }

    /**
     * Partially update a deliveryMan.
     *
     * @param deliveryManDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<DeliveryManDTO> partialUpdate(DeliveryManDTO deliveryManDTO) {
        log.debug("Request to partially update DeliveryMan : {}", deliveryManDTO);

        return deliveryManRepository
            .findById(deliveryManDTO.getId())
            .map(existingDeliveryMan -> {
                deliveryManMapper.partialUpdate(existingDeliveryMan, deliveryManDTO);

                return existingDeliveryMan;
            })
            .map(deliveryManRepository::save)
            .map(deliveryManMapper::toDto);
    }

    /**
     * Get all the deliveryMen.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<DeliveryManDTO> findAll() {
        log.debug("Request to get all DeliveryMen");
        return deliveryManRepository.findAll().stream().map(deliveryManMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one deliveryMan by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DeliveryManDTO> findOne(Long id) {
        log.debug("Request to get DeliveryMan : {}", id);
        return deliveryManRepository.findById(id).map(deliveryManMapper::toDto);
    }

    /**
     * Delete the deliveryMan by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DeliveryMan : {}", id);
        deliveryManRepository.deleteById(id);
    }
}
