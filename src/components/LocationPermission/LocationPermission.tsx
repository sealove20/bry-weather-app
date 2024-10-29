import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomText } from "../CustomText";
import { colors } from "@/tokens/colors";

interface LocationPermissionProps {
  goToSettings: () => void;
}

export const LocationPermission = ({ goToSettings }: LocationPermissionProps) => (
  <View style={styles.permissionCard}>
    <CustomText size="sm">A permissão de localização é necessária</CustomText>
    <CustomText size="xsm">
      As informações sobre a previsão do tempo da sua localização não estarão disponíveis sem a
      permissão de localização. Por favor permita que WeatherApp acesse a localização deste
      dispositivo
    </CustomText>
    <TouchableOpacity style={styles.permissionCardButton} onPress={goToSettings}>
      <CustomText size="xsm">Abrir configuração de permissões</CustomText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  permissionCard: {
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.yellow.dark,
    width: "100%",
    height: 250,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  permissionCardButton: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 15,
    marginTop: 10,
    padding: 7,
  },
});
