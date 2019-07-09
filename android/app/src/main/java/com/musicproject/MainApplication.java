package com.musicproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(getResources().getString("9dQ-HCP45ULKha6JWBZ5yhMepwI5HJW9TwQ6yS"), getApplicationContext(), BuildConfig.DEBUG),
            new RNDeviceInfo(),
            new RNExitAppPackage(),
            new ReanimatedPackage(),
            new RNFSPackage(),
            new SvgPackage(),
            new RNCWebViewPackage(),
            new TrackPlayer(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
