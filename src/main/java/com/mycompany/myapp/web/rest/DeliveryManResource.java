package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.DeliveryManRepository;
import com.mycompany.myapp.service.DeliveryManService;
import com.mycompany.myapp.service.dto.DeliveryManDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.DeliveryMan}.
 */
@RestController
@RequestMapping("/api")
public class DeliveryManResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryManResource.class);

    private static final String ENTITY_NAME = "deliveryMan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryManService deliveryManService;

    private final DeliveryManRepository deliveryManRepository;

    public DeliveryManResource(DeliveryManService deliveryManService, DeliveryManRepository deliveryManRepository) {
        this.deliveryManService = deliveryManService;
        this.deliveryManRepository = deliveryManRepository;
    }

    /**
     * {@code POST  /delivery-men} : Create a new deliveryMan.
     *
     * @param deliveryManDTO the deliveryManDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryManDTO, or with status {@code 400 (Bad Request)} if the deliveryMan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/delivery-men")
    public ResponseEntity<DeliveryManDTO> createDeliveryMan(@Valid @RequestBody DeliveryManDTO deliveryManDTO) throws URISyntaxException {
        log.debug("REST request to save DeliveryMan : {}", deliveryManDTO);
        if (deliveryManDTO.getId() != null) {
            throw new BadRequestAlertException("A new deliveryMan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryManDTO result = deliveryManService.save(deliveryManDTO);
        return ResponseEntity
            .created(new URI("/api/delivery-men/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-men/:id} : Updates an existing deliveryMan.
     *
     * @param id the id of the deliveryManDTO to save.
     * @param deliveryManDTO the deliveryManDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryManDTO,
     * or with status {@code 400 (Bad Request)} if the deliveryManDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryManDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/delivery-men/{id}")
    public ResponseEntity<DeliveryManDTO> updateDeliveryMan(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DeliveryManDTO deliveryManDTO
    ) throws URISyntaxException {
        log.debug("REST request to update DeliveryMan : {}, {}", id, deliveryManDTO);
        if (deliveryManDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryManDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryManRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DeliveryManDTO result = deliveryManService.update(deliveryManDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryManDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /delivery-men/:id} : Partial updates given fields of an existing deliveryMan, field will ignore if it is null
     *
     * @param id the id of the deliveryManDTO to save.
     * @param deliveryManDTO the deliveryManDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryManDTO,
     * or with status {@code 400 (Bad Request)} if the deliveryManDTO is not valid,
     * or with status {@code 404 (Not Found)} if the deliveryManDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the deliveryManDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/delivery-men/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DeliveryManDTO> partialUpdateDeliveryMan(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DeliveryManDTO deliveryManDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update DeliveryMan partially : {}, {}", id, deliveryManDTO);
        if (deliveryManDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deliveryManDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryManRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DeliveryManDTO> result = deliveryManService.partialUpdate(deliveryManDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryManDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /delivery-men} : get all the deliveryMen.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryMen in body.
     */
    @GetMapping("/delivery-men")
    public List<DeliveryManDTO> getAllDeliveryMen() {
        log.debug("REST request to get all DeliveryMen");
        return deliveryManService.findAll();
    }

    /**
     * {@code GET  /delivery-men/:id} : get the "id" deliveryMan.
     *
     * @param id the id of the deliveryManDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryManDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/delivery-men/{id}")
    public ResponseEntity<DeliveryManDTO> getDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to get DeliveryMan : {}", id);
        Optional<DeliveryManDTO> deliveryManDTO = deliveryManService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryManDTO);
    }

    /**
     * {@code DELETE  /delivery-men/:id} : delete the "id" deliveryMan.
     *
     * @param id the id of the deliveryManDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/delivery-men/{id}")
    public ResponseEntity<Void> deleteDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryMan : {}", id);
        deliveryManService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
