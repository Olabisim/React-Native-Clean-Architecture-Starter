import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
    AppModal,
    AppScreen,
    BoldText,
    FullWidthButton,
    Heading,
    MediumButton,
    PageHeaderWithGoback,
    Paragraph,
    RegularText,
    SemiBoldText,
    SmallButton,
    SmallHeader,
    SmallText,
    SubHeading,
} from '@/components/ui';

import {
    BRAND_COLOR,
    ERROR,
    GRAY_200,
    INFO,
    SUCCESS,
    WARNING,
} from '@/common/colors';
import { Spacing } from '@/common/spacing';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <AppScreen
      header={
        <PageHeaderWithGoback
          label="Design System"
          subLabel="All UI primitives"
          goBackAction={() => {}}
        />
      }
    >
      {/* ── Typography ─────────────────────────────────────────── */}
      <Section title="Typography">
        <Heading>Heading — bold 28</Heading>
        <SubHeading>SubHeading — semi 20</SubHeading>
        <Paragraph>
          Paragraph — regular 15. Use for body copy and descriptive text that
          needs comfortable line-height and good readability.
        </Paragraph>
        <SmallHeader>Small Header · overline</SmallHeader>
        <SmallText>SmallText — caption 11px</SmallText>
        <Divider />
        <BoldText>BoldText — 700 weight</BoldText>
        <SemiBoldText>SemiBoldText — 600 weight</SemiBoldText>
        <RegularText>RegularText — 400 weight</RegularText>
        <Divider />
        <BoldText color={BRAND_COLOR}>Coloured text via prop</BoldText>
        <Paragraph color={SUCCESS}>Success green paragraph</Paragraph>
        <Paragraph color={WARNING}>Warning amber paragraph</Paragraph>
        <Paragraph color={ERROR}>Error red paragraph</Paragraph>
        <Paragraph color={INFO}>Info blue paragraph</Paragraph>
      </Section>

      {/* ── Buttons ────────────────────────────────────────────── */}
      <Section title="Full-Width Buttons">
        <FullWidthButton label="Filled (default)" onPress={() => {}} />
        <FullWidthButton label="Outline" onPress={() => {}} variant="outline" />
        <FullWidthButton label="Ghost" onPress={() => {}} variant="ghost" />
        <FullWidthButton label="Danger" onPress={() => {}} variant="danger" />
        <FullWidthButton label="Disabled" onPress={() => {}} disabled />
        <FullWidthButton
          label={loading ? '' : 'Tap for loading state'}
          onPress={handleLoadingDemo}
          loading={loading}
        />
      </Section>

      <Section title="Medium Buttons">
        <View style={styles.row}>
          <MediumButton label="Filled" onPress={() => {}} />
          <MediumButton label="Outline" onPress={() => {}} variant="outline" />
          <MediumButton label="Ghost" onPress={() => {}} variant="ghost" />
        </View>
        <View style={styles.row}>
          <MediumButton label="Danger" onPress={() => {}} variant="danger" />
          <MediumButton label="Disabled" onPress={() => {}} disabled />
        </View>
      </Section>

      <Section title="Small Buttons">
        <View style={styles.row}>
          <SmallButton label="Filled" onPress={() => {}} />
          <SmallButton label="Outline" onPress={() => {}} variant="outline" />
          <SmallButton label="Ghost" onPress={() => {}} variant="ghost" />
          <SmallButton label="Danger" onPress={() => {}} variant="danger" />
        </View>
      </Section>

      {/* ── Modal ──────────────────────────────────────────────── */}
      <Section title="Modal">
        <FullWidthButton
          label="Open Modal"
          onPress={() => setModalVisible(true)}
          variant="outline"
        />
      </Section>

      {/* ── AppModal ───────────────────────────────────────────── */}
      <AppModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Confirm action"
      >
        <Paragraph>
          This is the AppModal. It slides up from the bottom, has a drag
          handle, and dismisses when you tap the backdrop or the close button.
        </Paragraph>
        <View style={{ gap: Spacing.sm }}>
          <FullWidthButton
            label="Confirm"
            onPress={() => setModalVisible(false)}
          />
          <FullWidthButton
            label="Cancel"
            onPress={() => setModalVisible(false)}
            variant="outline"
          />
        </View>
      </AppModal>
    </AppScreen>
  );
}

// ─── Local helpers ────────────────────────────────────────────────────────────

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <SmallHeader style={{ marginBottom: Spacing.sm }}>{title}</SmallHeader>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  sectionBody: {
    gap: Spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: GRAY_200,
    marginVertical: Spacing.xs,
  },
});
