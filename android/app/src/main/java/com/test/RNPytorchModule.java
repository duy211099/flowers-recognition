package com.test;


import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;

import org.pytorch.IValue;
import org.pytorch.Module;
import org.pytorch.Tensor;
import org.pytorch.torchvision.TensorImageUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Scanner;
import java.util.ArrayList;

public class RNPytorchModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private Module module = null;
    private String[] labels = new String[]{};

    public RNPytorchModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNPytorch";
    }

    @ReactMethod
    public void loadModel(final String modelPath, final String labelPath, Promise promise) {
        Log.i("MODEL", "loadModel: ");
        try {
            // loading serialized torchscript module from packaged into app android asset model.pt,
            // app/src/assets/model.pt
            String path = assetFilePath(this.reactContext, modelPath);
            module = Module.load(path);

            // load labels
            Scanner sc = new Scanner(new File(assetFilePath(this.reactContext, labelPath)));
            List<String> lines = new ArrayList<String>();
            while (sc.hasNextLine()) {
                lines.add(sc.nextLine());
            }

            String[] arr = lines.toArray(new String[0]);
            labels = arr;

            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("unable to calculate laplacian score", e);
        }
    }

    @ReactMethod
    public void show() {
        Toast.makeText(getReactApplicationContext(), "Awesome", Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void predict(final String imagePath, Promise promise) {
        Log.i("PREDICT", "PREDICT: ");
        try {

            InputStream inputStream = new FileInputStream(imagePath.replace("file://", ""));
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

            // preparing input tensor
            final Tensor inputTensor = TensorImageUtils.bitmapToFloat32Tensor(bitmap,
                    TensorImageUtils.TORCHVISION_NORM_MEAN_RGB, TensorImageUtils.TORCHVISION_NORM_STD_RGB);

            // running the model
            final Tensor outputTensor = module.forward(IValue.from(inputTensor)).toTensor();

            // getting tensor content as java array of floats
            final float[] scores = outputTensor.getDataAsFloatArray();

            WritableArray result = Arguments.createArray();

            // searching for the index with maximum score
            for (int i = 0; i < scores.length; i++) {
                WritableMap row = Arguments.createMap();
                row.putString("label", this.labels[i]);
                row.putDouble("confidence", scores[i]);
                result.pushMap(row);
            }


                promise.resolve(result);
        } catch (Exception e) {
            promise.reject("unable to calculate laplacian score", e);
        }
    }

    /**
     * Copies specified asset to the file in /files app directory and returns this file absolute path.
     *
     * @return absolute file path
     */

    public static String assetFilePath(ReactApplicationContext context, String assetName) throws IOException {
        File file = new File(context.getFilesDir(), assetName);

        if (file.exists() && file.length() > 0) {
            return file.getAbsolutePath();
        }

        try (InputStream is = context.getAssets().open(assetName)) {
            try (OutputStream os = new FileOutputStream(file)) {
                byte[] buffer = new byte[4 * 1024];
                int read;
                while ((read = is.read(buffer)) != -1) {
                    os.write(buffer, 0, read);
                }
                os.flush();
            }
            return file.getAbsolutePath();
        }
    }
    public static Bitmap getBitmapFromURL(String src) {
        try {
            URL url = new URL(src);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            // Log exception
            return null;
        }
    }
}
