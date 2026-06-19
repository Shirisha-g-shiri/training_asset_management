package com.service;

import com.enums.AssetStatus;
import com.exceptions.InvalidOwnershipException;
import com.exceptions.ResourceNotFoundException;
import com.model.Asset;
import com.model.Hr;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class AssetService {
    private final Session session;
    private HrService hrService;
    public AssetService(Session session) {

        this.session = session;
        hrService = new HrService(session);
    }

    public void insert(Asset asset) {
        Transaction transaction = session.beginTransaction();
        session.persist(asset);
        transaction.commit();
    }

    public void deleteRecord(int id) {
        Transaction transaction = session.beginTransaction();
        Asset asset = session.find(Asset.class,id);
        if(asset == null){
            transaction.commit();
            throw new ResourceNotFoundException("Invalid ID");
        }
//        session.remove(asset);
        session.createMutationQuery("delete from Asset where id=:id")
                .setParameter("id",id)
                .executeUpdate();
        transaction.commit();
    }

    public List<Asset> getAllAssets() {
        Transaction transaction = session.beginTransaction();
        List<Asset> list = session
                .createQuery("from Asset", Asset.class)
                .list();

        transaction.commit();
        return list;
    }

    public Asset getById(int id) {
        Transaction tx = session.beginTransaction();
        Asset asset = session.find(Asset.class, id);
        tx.commit();
        if(asset == null)
            throw new ResourceNotFoundException("Invalid ID given..");

        return asset;
    }

    public void addAsset(Asset asset, String username) {
        Hr hr =  hrService.getByUsername(username);
        asset.setHr(hr);
        asset.setAsset_status(AssetStatus.PENDING);
        Transaction tx = session.beginTransaction();
        session.persist(asset);
        tx.commit();
    }

    public void deleteById(int assetId, String username) {

        Asset asset = session.find(Asset.class,assetId);
        if(asset == null)
            throw new ResourceNotFoundException("Asset Id invalid");
        Hr hr=hrService.getByUsername(username);
        if(asset.getHr().getId() != hr.getId())
            throw new InvalidOwnershipException("Hr does not own this asset, Deletion aborted");
        Transaction transaction = session.beginTransaction();
        session.remove(asset);
        transaction.commit();
    }
}
