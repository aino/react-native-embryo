package com.aino.embryo;

import android.support.annotation.Nullable;

import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.soloader.SoLoader;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new ReactNativeRestartPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
