<?php

    function file_upgrade($file_name) {
        if (file_exists("/uploads/" . $_FILES[$file_name . "_file"]["name"])) {
        }
        else {
            move_uploaded_file($_FILES[$file_name . "_file"]["tmp_name"],
            "/uploads/" . $_FILES[$file_name . "_file"]["name"]);
        }

        switch ($file_name) {
        case "MLO":
            //exec("flash_erase  /dev/mtd0  0x20000 3");
            exec("nandwrite  -p  /dev/mtd0 /uploads/MLO");
            //exec("rm -rf /uploads/MLO")
            exec("sync");
            break;
        case "uboot":
            //exec("flash_erase  /dev/mtd1  0x20000 10");
            exec("nandwrite  -p  /dev/mtd1 /uploads/u-boot.img");
            //exec("rm -rf /uploads/u-boot.img")
            exec("sync");
            break;
        case "zImage":
            //exec("flash_erase  /dev/mtd2  0x20000 24");
            exec("nandwrite  -p  /dev/mtd2 /uploads/zImage");
            //exec("rm -rf /uploads/zImage")
            exec("sync");
            break;
        case "dtb":
            //exec("flash_erase  /dev/mtd3  0x20000 3");
            exec("nandwrite  -p  /dev/mtd3 /uploads/am335x-cmi_at151.dtb");
            //exec("rm -rf /uploads/*dtb")
            exec("sync");
            break;
        case "opt":
            //exec("rm /opt/* -rf");
            exec("tar -xf /uploads/opt.tar  -C /opt/");
            //exec("rm -rf /uploads/opt.tar")
            exec("sync");
            break;
        default:
            break;
        }
    }


    file_upgrade("MLO");
    file_upgrade("uboot");
    file_upgrade("zImage");
    file_upgrade("dtb");
    file_upgrade("opt");
?>
