import AddressModel from "../models/address.model.js";

import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from "fs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const addAddress = async (req, res) => {
    try {
        const userId = req.userId
        const data = req.body

        const payload = {
            ...data, userId
        }
        const newAddress = await AddressModel(payload)
        const address = await newAddress.save()

        if (!address) {
            throw new Error("Unable to save address");
        }


        return res.json({
            success: true,
            message: "Address created successfully",
            data: address
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAddresses = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const userId = req.userId
        // Calculate the offset
        const offset = (page - 1) * limit;

        const addresses = await AddressModel.find({ userId }).skip(offset)
            .limit(limit)
            .exec();

        if (!addresses) {
            throw new Error("Not found");
        }


        return res.json({
            success: true,
            message: "Addresses fetched",
            data: addresses,
            page,
            limit,
            // pages: Math.ceil(total / limit),
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateAddress = async (req, res) => {
    try {
        const data = req.body


        if (!data.id) {
            throw new Error("Please provide data");
        }

        const updatedAddress = await AddressModel.findOneAndUpdate({
            _id: data.id
        }, {
            ...data
        }, {
            new: true
        })
        if (!updatedAddress) {
            throw new Error("Unable update address");
        }


        return res.json({
            success: true,
            message: "Address updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { addAddress, getAddresses, updateAddress }