package com.service;

import com.expection.ResourceNotFoundException;
import com.model.Asset;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.List;

public class AssetService {
    private Session session;
    public AssetService(Session session) {
        this.session = session;
    }
    public void insert(Asset asset) {
        Transaction transaction = session.beginTransaction();
        session.persist(asset);
        transaction.commit();
    }

    public void deleteRecord(int id) {
        Transaction transaction = session.beginTransaction();
        Asset asset =session.find(Asset.class,id);
        if(asset == null){
            transaction.commit();
            throw new ResourceNotFoundException("Invalid Id");
        }
        session.createMutationQuery("delete from Asset where id=:id")
                .setParameter("id",id)
                .executeUpdate();
        transaction.commit();
    }

    public List<Asset> getAllAssets() {
        Transaction transaction = session.beginTransaction();
        List<Asset> list =  session.createQuery("from Asset",Asset.class).list();
        transaction.commit();
        return list;
    }

    public Asset getById(int id) {
        Transaction transaction = session.beginTransaction();
        Asset asset = session.find(Asset.class,id);
        transaction.commit();
        if(asset == null){
            throw new ResourceNotFoundException("Invalid Id");
        }
        return asset;
    }
}
