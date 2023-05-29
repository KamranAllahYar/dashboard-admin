<template>
  <n-space :vertical="true" style="margin-right: 30px; margin-left: 30px">
    <n-grid :x-gap="12" :y-gap="8" cols="9 xs:2 s:2 m:2 l:9" responsive="screen">
      <n-grid-item span="6 xs:2 s:2 m:2 l:6">
        <n-card
          style="
            border-radius: 10px;
            margin-top: 10px;
            border-width: 1px;
            display: flex;
            justify-items: center;
          "
        >
          <main-wallet-recharge-modal />
        </n-card>
      </n-grid-item>
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-space :vertical="true">
          <n-card
            style="
              height: 250px;
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              display: flex;
              justify-items: center;
            "
          >
            <n-space>
              <n-icon
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                  style="width: 20px; height: 20px; color: rgb(255, 117, 108)"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M9 15l6-6" />
                    <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />
                    <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />
                    <path
                      d="M5 7.2A2.2 2.2 0 0 1 7.2 5h1a2.2 2.2 0 0 0 1.55-.64l.7-.7a2.2 2.2 0 0 1 3.12 0l.7.7a2.2 2.2 0 0 0 1.55.64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7.7a2.2 2.2 0 0 1 0 3.12l-.7.7a2.2 2.2 0 0 0-.64 1.55v1a2.2 2.2 0 0 1-2.2 2.2h-1a2.2 2.2 0 0 0-1.55.64l-.7.7a2.2 2.2 0 0 1-3.12 0l-.7-.7a2.2 2.2 0 0 0-1.55-.64h-1a2.2 2.2 0 0 1-2.2-2.2v-1a2.2 2.2 0 0 0-.64-1.55l-.7-.7a2.2 2.2 0 0 1 0-3.12l.7-.7A2.2 2.2 0 0 0 5 8.2v-1"
                    />
                  </g></svg
              ></n-icon>
              <p style="color: rgb(255, 117, 108); font-weight: bold; margin-top: 3px"
                >Available Offers</p
              >
            </n-space>
            <p
              style="
                margin-top: 10px;
                font-size: 13px;
                text-align: left;
                color: rgb(38, 63, 151);
                letter-spacing: 0.01em;
              "
              >- First Recharge Offer! Pay PKR300/- & get PKR600/- in your WESHIP wallet. 100%
              cashback offer. *T&C Apply With code:'WESHIP300'</p
            >
          </n-card>
          <n-card
            style="
              height: 250px;
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              display: flex;
              justify-items: center;
            "
          >
            <p
              style="
                font-size: 18px;
                opacity: 0.6;
                padding-bottom: 10px;
                line-height: 32px;
                font-weight: 700;
                color: rgb(38, 63, 151);
                margin: 0px;
                letter-spacing: 0.2px;
              "
            >
              NEFT Payment - Bank details
            </p>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                Beneficiary Name :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                WeShip Pvt. Ltd
              </p>
            </n-space>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                Bank Name :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                Meezan Bank Limited
              </p>
            </n-space>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                Bank Branch :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                Gulberg branch
              </p>
            </n-space>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                Account Number :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                3453456356322
              </p>
            </n-space>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                Account Type :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                Current Account
              </p>
            </n-space>
            <n-space justify="space-between">
              <p style="font-size: 14px; letter-spacing: -0.01em; color: rgb(38, 63, 151)">
                IFSC Code :
              </p>
              <p
                style="
                  font-weight: 600;
                  font-size: 14px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                "
              >
                KKBK0004621
              </p>
            </n-space>
          </n-card>
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>
