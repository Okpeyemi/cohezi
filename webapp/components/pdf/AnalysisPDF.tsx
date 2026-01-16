import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { FinalVerdict } from '@/types/analysis';

// Register a standard font (optional, using standard Helvetica for now which is built-in)
// If we wanted to use Inter, we would need to register it here.

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E7', // Zinc-200
        paddingBottom: 10,
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    logoSub: {
        fontSize: 10,
        color: '#52525B', // Zinc-600
    },
    date: {
        fontSize: 10,
        color: '#71717A', // Zinc-500
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#18181B', // Zinc-900
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#10B981', // Emerald-500 for brand touch
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    contentBlock: {
        backgroundColor: '#F4F4F5', // Zinc-100
        padding: 10,
        borderRadius: 4,
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#3F3F46', // Zinc-700
        marginBottom: 4,
    },
    label: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#71717A',
        marginBottom: 2,
        textTransform: 'uppercase',
    },
    verdictBox: {
        borderWidth: 1,
        borderColor: '#10B981',
        backgroundColor: '#ECFDF5', // Emerald-50
        padding: 15,
        borderRadius: 4,
        marginBottom: 20,
    },
    verdictText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#065F46', // Emerald-800
        lineHeight: 1.4,
    },
    flawItem: {
        marginBottom: 10,
        borderLeftWidth: 2,
        borderLeftColor: '#F43F5E', // Rose-500
        paddingLeft: 8,
    },
    flawTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#BE123C', // Rose-700
    },
    solutionText: {
        fontSize: 10,
        color: '#065F46',
        marginTop: 4,
        fontStyle: 'italic',
    },
    table: {
        display: "flex",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#E4E4E7',
        marginTop: 10
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#E4E4E7',
    },
    tableCell: {
        margin: 5,
        fontSize: 9
    }
});

interface AnalysisPDFProps {
    decision: string;
    reasoning: string;
    verdict: FinalVerdict;
}

export const AnalysisPDF = ({ decision, reasoning, verdict }: AnalysisPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.logo}>Cohezi</Text>
                    <Text style={styles.logoSub}>Moteur d'Évaluation Cognitive</Text>
                </View>
                <Text style={styles.date}>{new Date().toLocaleDateString('fr-FR')}</Text>
            </View>

            <Text style={styles.title}>Rapport Exécutif</Text>

            {/* Context */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contexte de la Décision</Text>
                <View style={styles.contentBlock}>
                    <Text style={styles.label}>Intention</Text>
                    <Text style={styles.text}>{decision}</Text>
                    <View style={{ height: 8 }} />
                    <Text style={styles.label}>Raisonnement Initial</Text>
                    <Text style={styles.text}>{reasoning}</Text>
                </View>
            </View>

            {/* Synthesis Verdict */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Synthèse Stratégique</Text>
                <View style={styles.verdictBox}>
                    <Text style={styles.verdictText}>{verdict.synthesis_summary}</Text>
                </View>
            </View>

            {/* Critical Flaws */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Points de Vigilance & Solutions</Text>
                {verdict.critical_flaws.length > 0 ? (
                    verdict.critical_flaws.map((flaw, i) => (
                        <View key={i} style={styles.flawItem}>
                            <Text style={styles.flawTitle}>{flaw.title}</Text>
                            <Text style={styles.text}>{flaw.impact}</Text>
                            {flaw.solution && (
                                <Text style={styles.solutionText}>💡 Solution : {flaw.solution}</Text>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.text}>Aucune faille critique majeure détectée.</Text>
                )}
            </View>

            {/* Conditions de succès (Simple List for now) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Conditions de Succès</Text>
                {verdict.decision_paths.filter(p => p.robustness_score > 60).map((path, i) => (
                    <View key={i} style={{ marginBottom: 5 }}>
                        <Text style={styles.text}>• {path.valid_if}</Text>
                    </View>
                ))}
                {verdict.decision_paths.filter(p => p.robustness_score > 60).length === 0 && (
                    <Text style={styles.text}>Aucun chemin de haute robustesse identifié.</Text>
                )}
            </View>

            {/* Footer */}
            <Text style={{ position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 8, textAlign: 'center', color: '#A1A1AA' }}>
                Généré par Cohezi AI • Ce document est une aide à la décision et ne remplace pas le jugement humain.
            </Text>

        </Page>
    </Document>
);
